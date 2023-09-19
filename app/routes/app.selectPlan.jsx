
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Button, Page, Text } from "@shopify/polaris";
import Shop, { PLANS } from "~/models/Shop.server";
import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { useCallback, useEffect } from "react";


const ACTIONS = {
  ChangePlan: "change-plan"
}

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql)

  const plan = await shop.getCurrentPlan()
  return json({
    shop: session.shop.replace(".myshopify.com", ""),
    currentPlan: plan,
    PLANS
  });
};


export async function action({ request }) {
  const {session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql)

  const { action, toPlan } = await request.json()

  // console.log(body)
  if (action == ACTIONS.ChangePlan) {
    const newPlan = PLANS.find(plan => plan.id === toPlan )
    const newPlanData = await shop.changePlan(newPlan)
    return json({
      newPlan
    });
  }

}


export default function SelectPlanRoute() {
  const { currentPlan, PLANS } = useLoaderData()
  const actionData = useActionData()

  const submit = useSubmit()

  // incoming server's action response
  const newPlan = actionData?.newPlan
  useEffect( () => {
    if( newPlan) {
      shopify.toast.show(`Plan changed to ${newPlan.title}`)
    }
  }, [newPlan])



  const changePlan = (to) => submit({ action: ACTIONS.ChangePlan, toPlan: to }, { replace: true, method: "POST", encType: "application/json" });

  return <Page>
    <ui-title-bar title="Test: Select Plan Page" />

    <Text as="h4">Current Plan: {currentPlan.title}</Text>

    {PLANS.map(plan => {
      return <Button onClick={() => {
        changePlan(plan.id)
      }} key={plan.id} primary disabled={plan.id == currentPlan.id}>Change to {plan.title}</Button>
    })}

  </Page>
}
