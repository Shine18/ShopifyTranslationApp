
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Page } from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};


export default function SelectPlanRoute() {

  return <Page>
    <ui-title-bar title="Dev Pages List" />
    {/* add your code here */}
  </Page>
}
