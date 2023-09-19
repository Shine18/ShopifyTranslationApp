export function QueryAppSubscriptionCharge() {
  return `#graphql
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
      }`
}
