import prisma from "~/db.server";

export async function checkBilling(shop, graphql) {
  // TODO: Check if shop has charge created
  let charge = await getCharge(shop)

  var a = 2
  // TODO: IF not, create the charge and redirect the user to charge
  if (!charge) {
    const chargeData = await createCharge(shop, graphql)
    if (chargeData) {
      charge = await saveCharge(shop, chargeData?.id, chargeData?.confirmationUrl)
    }
  }


  // TODO: IF yes, then check if charge is paid
  const chargeStatus = await getChargeStatus(charge?.shopifyId, graphql)


  // TODO: IF charge is not paid, then redirect user to charge
  if( charge &&  chargeStatus == "PENDING") {
    return {
      isPaid: false,
      confirmationUrl: charge.confirmationUrl
    }
  }

  return {
    isPaid: true
  }

}

async function createCharge(shop, graphql) {
  const { SHOPIFY_API_KEY } = process.env
  const returnURl = `https://${shop}/admin/apps/${SHOPIFY_API_KEY}`
  const response = await graphql(
    `#graphql
      mutation appSubscriptionCreate($lineItems: [AppSubscriptionLineItemInput!]!, $name: String!, $returnUrl: URL!, $test: Boolean) {
        appSubscriptionCreate(lineItems: $lineItems, name: $name, returnUrl: $returnUrl, test: $test) {
          appSubscription {
            id
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }`,
    {
      variables: {
        name: "Test Plan",
        returnUrl: returnURl,
        test: true,
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: {
                  amount: 10,
                  currencyCode: "USD"
                },
                interval: "EVERY_30_DAYS"
              }
            }
          }
        ]
      },
    }
  );
  const subscriptionData = await response.json()

  const { id } = subscriptionData?.data?.appSubscriptionCreate?.appSubscription
  const { confirmationUrl } = subscriptionData?.data?.appSubscriptionCreate

  if (id && confirmationUrl) {
    return {
      id,
      confirmationUrl
    }
  }

  return false
}


export async function testBillingMutation(shop, graphql) {
  const { SHOPIFY_API_KEY } = process.env
  const returnURl = `https://${shop}/admin/apps/${SHOPIFY_API_KEY}`
  const response = await graphql(
    `#graphql
      mutation appSubscriptionCreate($lineItems: [AppSubscriptionLineItemInput!]!, $name: String!, $returnUrl: URL!, $test: Boolean) {
        appSubscriptionCreate(lineItems: $lineItems, name: $name, returnUrl: $returnUrl, test: $test) {
          appSubscription {
            id
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }`,
    {
      variables: {
        name: "Test Plan",
        returnUrl: returnURl,
        test: true,
        lineItems: [
          {
            plan: {
              appRecurringPricingDetails: {
                price: {
                  amount: 10,
                  currencyCode: "USD"
                },
                interval: "EVERY_30_DAYS"
              }
            }
          }
        ]
      },
    }
  );
  const subscriptionData = await response.json()

  const { id } = subscriptionData?.data?.appSubscriptionCreate?.appSubscription
  const { confirmationUrl } = subscriptionData?.data?.appSubscriptionCreate

  if (id && confirmationUrl) {
    saveCharge(shop, id, confirmationUrl)
    return {
      chargeURL: subscriptionData.data?.appSubscriptionCreate?.confirmationUrl
    }
  }

  return false
}



async function getChargeStatus(chargeId, graphql) {
  try {
    const response = await graphql(
      `#graphql
        query {
          node(id: "${chargeId}") {
            ...on AppSubscription {
              createdAt
              id
              status
            }
          }
        }`
    )
    const charge = await response.json()

    return charge?.data?.node?.status
  }
  catch (e) {
    console.log(e)
    return false
  }

}

async function getCharge(shop) {
  const charge = await prisma.charge.findFirst({
    where: {
      shop
    }
  })
  return charge
}

async function saveCharge(shop, charge_id, confirmationUrl) {
  // const chargeInDb = await prisma.charge.findFirst({
  //   where: {
  //     shopify_id: charge_id
  //   }
  // })
  const newCharge = await prisma.charge.create({
    data: {
      confirmationUrl,
      shopifyId: charge_id,
      shop
    }
  })
  return newCharge

}
