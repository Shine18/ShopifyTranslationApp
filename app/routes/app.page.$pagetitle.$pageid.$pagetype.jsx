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
export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const response = await admin.rest.get({ path: "/pages.json" });
  const shopobj = new Shop(session.shop, admin.graphql);

  const pages = await response.json();
  const getShop = await shopobj.getShop();
  return json({ pages, getShop });
}
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
  const [aiSelectedLanguage, setAISelectedLanguage] = useState();
  const [customSelectedLanguage, setCustomSelectedLanguage] = useState();
  const { pages, getShop } = useLoaderData();
  const [orignalPage, setOrignalPage] = useState('');
  useEffect(() => {
    console.log("basic language is", getShop.baseLanguageCode)
    console.log("pages are ", pages.pages)
    console.log(typeof parseInt(pageid))
    const pageFound = pages.pages.find((val) => val.id === parseInt(pageid));
    console.log("basic page is", pageFound.body_html)
    setOrignalPage(pageFound.body_html)
  }, [pages, getShop, pageid])
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
  useEffect(() => {
    if (type === 'ai' && getpage && getpage[0]) {
      setAISelectedLanguage(getpage[0].language);
    }
    if (type === 'custom' && getpage && getpage[0]) {
      setCustomSelectedLanguage(getpage[0].languageCode);
    }
  }, [getpage, type]);
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
          <Card>
            <div className="tagsdiv">
              {getpage.map((page, index) => {
                const languageLabel = optionstwo.find(option => option.value === page.language)?.label;

                return (
                  <div
                    key={index}
                    style={{ background: aiSelectedLanguage === page.language ? '#008060' : '#858383', padding: '8px' }}
                    className="tags"
                    onClick={() => setAISelectedLanguage(page.language)}
                  >
                    {languageLabel}
                  </div>
                );
              })}
            </div>

            {
              (() => {
                let languageLabel = optionstwo.find(option => option.value === aiSelectedLanguage)?.label;
                let baseLabel = optionstwo.find(option => option.value === getShop.baseLanguageCode)?.label;
                return (
                  <div className="title-language">
                    <h1 className="page-title">{pagetitle}</h1>
                    <div className="languagesitems">
                      <span>{baseLabel}</span>
                      <span> {languageLabel}</span>
                    </div>
                  </div>
                );
              })()
            }

            {
              (() => {
                const selectedPage = getpage.find(page => page.language === aiSelectedLanguage);
                if (selectedPage) {
                  let languageLabel = optionstwo.find(option => option.value === selectedPage.language)?.label;
                  let baseLabel = optionstwo.find(option => option.value === getShop.baseLanguageCode)?.label;

                  return (
                    <div className="main-container">
                      <div className="orignalpage">

                        <p className="html-data" dangerouslySetInnerHTML={{ __html: orignalPage }}></p>
                      </div>
                      <div className="pages-data">

                        <p className='html-data' dangerouslySetInnerHTML={{ __html: selectedPage.translation }} ></p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()
            }
          </Card> : null
      }

      {
        type === 'custom' && getpage && customSelectedLanguage ?
          <Card>
            <div className="tagsdiv">
              {
                Array.from(new Set(getpage.map(page => page.languageCode)))
                  .map((langCode, index) => {
                    const languageLabel = optionstwo.find(option => option.value === langCode)?.label;
                    return (
                      <div
                        key={index}
                        style={{ background: customSelectedLanguage === langCode ? '#008060' : '#858383', padding: '8px' }}
                        className="tags"
                        onClick={() => setCustomSelectedLanguage(langCode)}
                      >
                        {languageLabel}
                      </div>
                    );
                  })
              }
            </div>

            {
              (() => {
                let languageLabel = optionstwo.find(option => option.value === customSelectedLanguage)?.label;
                let baseLabel = optionstwo.find(option => option.value === getShop.baseLanguageCode)?.label;
                return (
                  <div className="title-language">
                    <h1 className="page-title">{pagetitle}</h1>
                    <div className="languagesitems">
                      <span>{baseLabel}</span>
                      <span> {languageLabel}</span>
                    </div>
                  </div>
                );
              })()
            }


            {
              (() => {
                const selectedPages = getpage.filter(page => page.languageCode === customSelectedLanguage);
                const uniquePages = selectedPages.filter((page, index, array) => array.findIndex(p => p.token === page.token) === index); // Remove duplicate tokens
                if (uniquePages.length > 0) {

                  return uniquePages.map((page, index) => (
                    <div className="main-container" key={index}>
                      <div className="orignalpage">

                        <p className="html-data">{page.token}</p>
                      </div>
                      <div className="pages-data">

                        <p className='html-data'>{page.tokenTranslation}</p>
                      </div>
                    </div>
                  ));
                }
                return null;
              })()
            }
          </Card> : null
      }





    </Page>
  )
}
