import { json, redirect } from "@remix-run/node";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { authenticate } from "../shopify.server";
import { useEffect } from "react";
import Product from "~/models/Products.server";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];
export async function loader({ request }) {
  const {session, admin} = await authenticate.admin(request);
  const products = new Product(session.shop, admin.graphql)
  const fetchproduct=await products.getProducts();
  return json({ apiKey: process.env.SHOPIFY_API_KEY, products:fetchproduct });

}
export default function Testproducts() {
  const { apiKey, products } = useLoaderData();

  useEffect(() => {
   console.log(products)
  }, [ products])

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

