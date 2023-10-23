import { json, redirect } from "@remix-run/node";

import { Link, Outlet, useLoaderData, useRouteError, useNavigate } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";
import { useEffect } from "react";
import Shop from "~/models/Shop.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);

  const shopModel = new Shop(session.shop, admin.graphql);
  const { isPaid, confirmationUrl, isNewShop } = await shopModel.setupShop();
  const checkLanguage = await shopModel.checkLanguages();
  console.log("checking languages", checkLanguage);

  return json({
    apiKey: process.env.SHOPIFY_API_KEY,
    isPaid,
    confirmationUrl,
    isNewShop,
    checkLanguage
  });
}

export default function App() {
  const navigate = useNavigate();
  const { apiKey, isPaid, confirmationUrl, isNewShop, checkLanguage } = useLoaderData();
  console.log("new shop", isNewShop)
  useEffect(() => {
    if (isNewShop) {

      navigate("/app/selectPlan");
    }

  }, [isNewShop])
  useEffect(() => {
    if (!isPaid && confirmationUrl) {
      open(confirmationUrl, "_top");
    }
    else if (isPaid && checkLanguage == false) {
      navigate("/app/languageselector");
    }

  }, [isPaid, confirmationUrl]);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
        <Link to="/app/selectPlan">Test: Select Plan page</Link>
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
