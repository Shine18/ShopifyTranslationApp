import { Link, useActionData, useParams, useSubmit, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import Shop from "~/models/Shop.server";
import Product from "~/models/Products.server"
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useEffect, useState } from "react";
import { Card, Page, Icon, Text } from "@shopify/polaris";
import {
  MobileBackArrowMajor
} from '@shopify/polaris-icons';
import componentstyles from "~/styles/summary.css";
import styles from "~/styles/showproduct.css";
import pagewordcomponentstyles from "~/styles/showpageword.css";
export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: componentstyles },
  { rel: "stylesheet", href: pagewordcomponentstyles }
];

export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql);
  const { productid } = await request.json();
  let getProduct;
  getProduct = await shop.getProduct(productid)
  const prod = new Product(session.shop, admin.graphql);
  const getProductDetails = await prod.getProductById(productid)
  return json({
    getProduct,
    getProductDetails
  });
}
export default function Productdata() {
  const { productid } = useParams()
  const location = useLocation();
  const fullId = `gid://shopify/Product/${productid}`;
  const submit = useSubmit();
  const actiondata = useActionData();
  const getProduct = actiondata?.getProduct;
  const getProductDetails = actiondata?.getProductDetails;
  const [products, setProducts] = useState([])
  useEffect( () => {
    console.log("product details",getProductDetails)
  },[getProductDetails])
  useEffect(() => {
    setProducts(getProduct)
  }, [getProduct])
  useEffect(() => {
    submit({ productid: fullId },
      { replace: true, method: "POST", encType: "application/json" })
  }, [fullId, submit])
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
  return (
    <Page fullWidth>
      <div style={{ height: '70px' }}>
        <Card>
          <div className='header-section'>
            <span className='back-arrow-container'>
              <Link to={location.state?.prevurl ? location.state.prevurl : ""}
              ><Icon
                  source={MobileBackArrowMajor}
                  tone="base"
                /></Link></span>
            <div className="navLinks">
              <Link to="/app" state={{ prevurl: "/app" }} style={{
                borderBottom: location.pathname === '/app' ? '2px solid #00805F' : 'none',
              }} >Page</Link>
              <Link to="/app/showproduct" state={{ prevurl: "/app/showproduct" }}
                style={{
                  borderBottom: location.pathname === '/app/showproduct' ? '2px solid #00805F' : 'none',
                }}>Product</Link>
              <Link to="/app/settings" state={{ prevurl: "/app/showproduct" }}
                style={{
                  borderBottom: location.pathname === '/app/settings' ? '2px solid #00805F' : 'none',
                }}>Setting</Link>
            </div>
          </div>
        </Card>
      </div>
      <Card>
         <Text variant="heading3xl" as="h2" alignment="center">{getProductDetails ? getProductDetails.data.node.title : ""}</Text>
      </Card>
      {products ? products.map((product, index) => {
        const correspondingOption = optionstwo.find(option => option.value === product.language);
        const labelToShow = correspondingOption ? correspondingOption.label : 'Not found';

        return (
          <Card key={index}>
            <Text variant="heading3xl" as="h2">{labelToShow}</Text>
            <Text variant="heading2xl" as="h3">Translation</Text>
            <p>{product.translation}</p>
          </Card>
        )
      }) : ""}
    </Page>
  )
}
