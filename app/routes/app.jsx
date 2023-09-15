import { json, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";

import { authenticate } from "../shopify.server";
import { checkBilling } from "~/models/Billing.server";
import { useEffect } from "react";
import Shop from "~/models/Shop.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }) {
  const {session, admin} = await authenticate.admin(request);

  const shopModel = new Shop(session.shop, admin.graphql)
  const {isPaid, confirmationUrl} = await shopModel.setupShop()




  // if( !isPaid && confirmationUrl) {
  //   return redirect(confirmationUrl)
  // }

  return json({ apiKey: process.env.SHOPIFY_API_KEY, isPaid, confirmationUrl });
}

export default function App() {
  const { apiKey, isPaid, confirmationUrl } = useLoaderData();

  useEffect(() => {
    if( !isPaid && confirmationUrl) {
      open(confirmationUrl, "_top")
    }
  }, [ isPaid, confirmationUrl])

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
