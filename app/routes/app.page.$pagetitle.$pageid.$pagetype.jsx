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
  const { pageid, action } = await request.json();
  let getpage;
  let type;
  if (action === "ai data") {
    getpage = await shop.getAITranslation(pageid)
    type = "ai"
  }
  if (action === "custom data") {
    getpage = await shop.getCustomTranslation(pageid)
    type = "custom"
  }
  return json({
    getpage,
    type
  });
}
export default function Productdata() {
  const { pagetitle, pageid, pagetype } = useParams()
  const location = useLocation();
  const submit = useSubmit();
  const actiondata = useActionData();
  const type = actiondata?.type;
  const getpage = actiondata?.getpage;
  useEffect(() => {
    console.log(pageid, pagetype)
    if (pagetype === "ai") {
      submit({ pageid: pageid, action: "ai data" },
        { replace: true, method: "POST", encType: "application/json" })
    }
    if (pagetype === "custom") {
      submit({ pageid: pageid, action: "custom data" },
        { replace: true, method: "POST", encType: "application/json" })
    }
  }, [pageid, pagetype])
  useEffect(() => {
    console.log("fetched type and page", type, getpage)
  }, [type, getpage])
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
      {
        type === 'ai' && getpage ?
          (
            getpage.map(page => {
              let languageLabel = optionstwo.find(option => option.value === page.language)?.label;

              return (
                <Card key={page.id}>
                  <div className="pages-data">
                    <h1 className='page-title'>{pagetitle}</h1>
                    <p className='Language'>Language: {languageLabel}</p>
                    <p className='html-data' dangerouslySetInnerHTML={{ __html: page.translation }} ></p>

                  </div>
                </Card>
              )
            })
          )
          : null
      }
      {
  type === 'custom' && getpage ?
  (
    getpage.map(page => {
      let languageLabel = optionstwo.find(option => option.value === page.languageCode)?.label;

      return(
        <Card key={page.id}>
            <div className="pages-data">
              <h1 className='page-title'>{pagetitle}</h1>
              <p className='Language'>Language: {languageLabel}</p>
              <p className='html-data' dangerouslySetInnerHTML={{ __html: page.translation }} ></p>

            </div>
        </Card>
      )
    })
  )
  : null
}


    </Page>
  )
}
