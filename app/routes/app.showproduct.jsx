import {
  Card,
  Text,
  Checkbox,
  Pagination,
  Page,
  Button,
  MediaCard,
  TopBar,
  Frame,
  Icon
} from "@shopify/polaris";
import {
  MobileBackArrowMajor
} from '@shopify/polaris-icons';
import styles from "~/styles/showproduct.css";
import { useState, useCallback, useEffect } from "react";
import Product from "~/models/Products.server";
import wordsCount from 'words-count';
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Link, useActionData, useLoaderData, useLocation, useNavigate, useSubmit } from "@remix-run/react";
import ShowPageword from '../component/Showpagewordcomponent'
import componentstyles from "~/styles/summary.css";
import pagewordcomponentstyles from "~/styles/showpageword.css";
import Shop from "~/models/Shop.server";
export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: componentstyles },
  { rel: "stylesheet", href: pagewordcomponentstyles }
];
export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const products = new Product(session.shop, admin.graphql);
  const fetchproduct = await products.getProducts();
  const shopobj = new Shop(session.shop, admin.graphql);
  const fetchedlanguages = await shopobj.fetchLanguages();
  const getShop = await shopobj.getShop();
  const WordsCount = await shopobj.getPlansWordCount();
  return json({
    shopurl: session.shop,
    products: fetchproduct.data.products.edges,
    pageInfo: fetchproduct.data.products.pageInfo,
    fetchedlanguages: fetchedlanguages,
    getShop,
    WordsCount
  });
}
export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql);
  const products = new Product(session.shop, admin.graphql);
  const { totalWords, transplatedproducts, producttostore, cursor, Prevcursor, action } = await request.json();
  let storeUsedWords;
  let translatedresponse;
  let storeproduct;
  let moreproduct;
  let prevProducts
  if (action === "TotalWordsCount") {
    storeUsedWords = await shop.addWordsUsage(totalWords);
  }
  if (action === "saveTranslationProduct") {

    translatedresponse = await shop.saveTranslationProduct(transplatedproducts);
  }
  if (action === "store-product") {
    storeproduct = await shop.saveProductHumanTranslation(producttostore)
  }

  if (action === "FetchMoreProducts") {
    moreproduct = await products.getProductsCursor(cursor)
  }
  if (action === "FetchPrevProducts") {
    prevProducts = await products.getPrevProducts(Prevcursor)
  }
  return json({
    storeUsedWords,
    storeproduct,
    translatedresponse,
    moreproduct,
    prevProducts
  });
}
export default function showproduct() {
  const submit = useSubmit();
  const location = useLocation();
  const actiondata = useActionData();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [nextclicked, setNextClicked] = useState(false);
  const { shopurl, products, pageInfo, fetchedlanguages, getShop, WordsCount } = useLoaderData();
  const [words, setWords] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [cursor, setCursor] = useState("");
  const [prevCursor, setPrevCursor] = useState("");
  const [selectedLanguages, setselectedLanguages] = useState([]);
  const [prods, setProducts] = useState([])
  const storedWordsResult = actiondata?.storeUsedWords;
  const storeproduct = actiondata?.storeproduct;
  const translatedresponse = actiondata?.translatedresponse
  const newproducts = actiondata?.moreproduct
  const prevProducts = actiondata?.prevProducts
  useEffect(() => {
    if (storeproduct === "Created new product record" || storeproduct === "Updated product record" || translatedresponse === "product translation uploaded")
      setNextClicked(false);
    if (products) {
      setProducts(products)
    }
    if (newproducts) {
      setProducts(newproducts.data.products.edges);
      setNextPage(newproducts.data.products.pageInfo.hasNextPage)
      setCursor(newproducts.data.products.pageInfo.endCursor)
      setPrevCursor(newproducts.data.products.pageInfo.startCursor)
    }
    if (prevProducts) {
      setProducts(prevProducts.data.products.edges);
      setNextPage(prevProducts.data.products.pageInfo.hasNextPage)
      setCursor(prevProducts.data.products.pageInfo.endCursor)
      setPrevCursor(prevProducts.data.products.pageInfo.startCursor)
    }
  }, [storeproduct, translatedresponse, products, newproducts, prevProducts]);
  const navigateTo = function (url) {
    open(url, "_blank");
  };
  useEffect(() => {
    console.log("list of products", selectedProducts)
  }, [selectedProducts])
  useEffect(() => {
    console.log("page Info", pageInfo)
    if (pageInfo) {
      setNextPage(pageInfo.hasNextPage)
      setCursor(pageInfo.endCursor)
      setPrevCursor(pageInfo.startCursor)
    }
    if (fetchedlanguages)
      setselectedLanguages(fetchedlanguages.TargetLanguagesCode.split(','))
  }, [fetchedlanguages, pageInfo])

  const selectProduct = function (product) {
    const productIndex = selectedProducts.findIndex((item) => item.node.id === product.node.id);
    if (productIndex === -1) {
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
      const calculatedWords = wordsCount(product.node.description);
      setWords(words => words + calculatedWords);
    } else {
      setSelectedProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts.splice(productIndex, 1);
        return updatedProducts;
      });
      const calculatedWords = wordsCount(product.node.description);
      setWords(words => words - calculatedWords);
    }
  };
  const handleChange = useCallback((newChecked) => {
    setChecked(newChecked);

    if (newChecked) {
      setSelectedProducts(prods);
    } else {
      setSelectedProducts([]);
    }
  }, [prods]);
  const fetchMoreProducts = () => {
    if (nextPage) {
      submit({ cursor: cursor, action: "FetchMoreProducts" },
        { replace: true, method: "POST", encType: "application/json" })
    }

  }
  const fetchPrevProducts = () => {
    submit({ Prevcursor: prevCursor, action: "FetchPrevProducts" },
      { replace: true, method: "POST", encType: "application/json" })
  }
  return (
    <Page
      fullWidth>
      {nextclicked ? <ShowPageword productPage={true} products={selectedProducts} words={words} selectedLanguages={selectedLanguages} WordsCount={WordsCount} getShop={getShop} /> : <>
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
        <div id="firstcheckbox">
          <Checkbox
            label="Select All"
            checked={checked}
            onChange={handleChange}
          />
        </div>
        <div id="grid">
          {prods.map((product, key) => {
            const selected = selectedProducts?.find(val => val.node.id === product.node.id) ? "Selected" : "Select";
            const outlined = selectedProducts?.find(val => val.node.id === product.node.id) ? true : false;
            console.log("Product is", selected)
            return (
              <MediaCard
                key={key}
                portrait={true}
                title={product.node.title}
                secondaryAction={{
                  content: "View Product",
                  onAction: () => {
                    const id = product.node.id.replace(/\D/g, '');
                    navigate(
                      `/app/${id}`
                    );
                  },
                }}
                primaryAction={{
                  content: selected,
                  onAction: () => {
                    selectProduct(product);

                  },
                  outline: outlined
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
            )
          })}
        </div>
        <div id="lastdiv">
          <div id="anotherdiv">
            <Pagination
              hasPrevious
              onPrevious={() => {
                console.log("Previous");
                fetchPrevProducts()
              }}
              hasNext
              onNext={() => {
                console.log("Next");
                fetchMoreProducts()
              }}
            />
            <Button onClick={() => setNextClicked(true)} primary>Next</Button>
          </div>
        </div>
      </>}
    </Page>
  );
}
