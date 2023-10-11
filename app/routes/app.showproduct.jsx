import {
  Card,
  Text,
  Checkbox,
  Pagination,
  Page,
  Button,
  Link
} from "@shopify/polaris";
import styles from "~/styles/showproduct.css";
import { useState, useCallback, useEffect } from "react";
import Product from "~/models/Products.server";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
export const links = () => [{ rel: "stylesheet", href: styles }];
export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const products = new Product(session.shop, admin.graphql);
  const fetchproduct = await products.getProducts();
  return json({
    shopurl: session.shop,
    products: fetchproduct.data.products.edges,
  });
}
export default function showproduct() {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const { shopurl, products } = useLoaderData();

  console.log("bull sheeeeeet");
  console.log(products);
  console.log("shop url is", shopurl);
  return (
    <Page>
      <div id="firstcheckbox">
        <Checkbox
          label="Select All"
          checked={checked}
          onChange={handleChange}
        />
      </div>
      <div id="grid">
        {products.map((product, key) => (
          <Card key={key}>
            <div className="cardimageholder">
              <img
                className="cardimage"
                src={product &&
                      product.node &&
                      product.node.images &&
                      product.node.images.edges &&
                      product.node.images.edges[0] &&
                      product.node.images.edges[0].node.originalSrc ? product.node.images.edges[0].node.originalSrc : ""}
                alt="Product Img"
              ></img>
            </div>
            <Text fontWeight="bold" variant="headingSm">
              {product.node.title}
            </Text>
            <Text>URL</Text>
            <Link url={`https://${shopurl}/products/${product.node.handle}`}>Product Url</Link>
            <div className="lastcardbutton">
              <Button>Select</Button>
              <Text>View</Text>
            </div>
          </Card>
        ))}
      </div>
      <div id="lastdiv">
        <div id="anotherdiv">
          <Pagination
            hasPrevious
            onPrevious={() => {
              console.log("Previous");
            }}
            hasNext
            onNext={() => {
              console.log("Next");
            }}
          />
          <Button primary>Next</Button>
        </div>
      </div>
    </Page>
  );
}
