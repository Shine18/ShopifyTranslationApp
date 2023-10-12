import {
  Card,
  Text,
  Checkbox,
  Pagination,
  Page,
  Button,
  MediaCard,
} from "@shopify/polaris";
import styles from "~/styles/showproduct.css";
import { useState, useCallback, useEffect } from "react";
import Product from "~/models/Products.server";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const { shopurl, products } = useLoaderData();
  const navigateTo = function (url) {
    open(url, "_blank");
  };
  const selectProduct = function (product) {
    console.log("this is the selected product", product);
    if (!selectedProducts.some((item) => item.node.id === product.node.id)) {
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
    }
  };
  useEffect(() => {
    const pros = selectedProducts;
    console.log("products are", pros);
  }, [selectedProducts]);
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
          <MediaCard
            key={key}
            portrait={true}
            title={product.node.title}
            secondaryAction={{
              content: "View Product On Store",
              onAction: () => {
                navigateTo(
                  `https://${shopurl}/products/${product.node.handle}`
                );
              },
            }}
            primaryAction={{
              content: "Select",
              onAction: () => {
                selectProduct(product);
              },
            }}
          >
            <img
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={
                product &&
                product.node &&
                product.node.images &&
                product.node.images.edges &&
                product.node.images.edges[0] &&
                product.node.images.edges[0].node.originalSrc
                  ? product.node.images.edges[0].node.originalSrc
                  : ""
              }
              alt="Product Img"
            ></img>
          </MediaCard>
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
