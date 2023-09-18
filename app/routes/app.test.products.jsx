import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { authenticate } from "../shopify.server";
import { useEffect } from "react";
import Product from "~/models/Products.server";
import { Page } from "@shopify/polaris";
export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const products = new Product(session.shop, admin.graphql)
  const fetchproduct = await products.getProducts();
  return json({ apiKey: process.env.SHOPIFY_API_KEY, products: fetchproduct });

}
export default function Testproducts() {
  const { apiKey, products } = useLoaderData();

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <Page></Page>
  );
}

