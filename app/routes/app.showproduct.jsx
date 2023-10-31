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
import { Link, useActionData, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
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
    fetchedlanguages: fetchedlanguages,
    getShop,
    WordsCount
  });
}
export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql);
  const { totalWords } = await request.json();
  const storeUsedWords = await shop.addWordsUsage(totalWords);
  return json({
    storeUsedWords,
  });
}
export default function showproduct() {
  const location = useLocation();
  const actiondata = useActionData();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [nextclicked, setNextClicked] = useState(false);
  const { shopurl, products, fetchedlanguages, getShop, WordsCount } = useLoaderData();
  const [words, setWords] = useState(0);
  const [selectedLanguages, setselectedLanguages] = useState([])
  const storedWordsResult = actiondata?.storeUsedWords;
  useEffect(() => {
    setNextClicked(false);
  }, [storedWordsResult]);
  const navigateTo = function (url) {
    open(url, "_blank");
  };
  useEffect(() => {
    if (fetchedlanguages)
      setselectedLanguages(fetchedlanguages.TargetLanguagesCode.split(','))
  }, [fetchedlanguages])
  const selectProduct = function (product) {
    console.log("this is the selected product", product);

    if (!selectedProducts.some((item) => item.node.id === product.node.id)) {
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
      const calculatedWords = wordsCount(product.node.description)
      setWords(words => words + calculatedWords)
    }
    else {
      setSelectedProducts((prevProducts) => prevProducts.filter((p) => p.node.id !== product.node.id));
    }
  };
  const handleChange = useCallback((newChecked) => {
    setChecked(newChecked);

    if (newChecked) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  }, [products]);
  return (
    <Page
      fullWidth>
      {nextclicked ? <ShowPageword products={selectedProducts} words={words} selectedLanguages={selectedLanguages} WordsCount={WordsCount} getShop={getShop} /> : <>
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
          {products.map((product, key) => {
            const selected = selectedProducts?.find(val => val.node.id === product.node.id) ? "Selected" : "Select";
            const outlined = selectedProducts?.find(val => val.node.id === product.node.id) ? true : false;
            console.log("Product is", selected)
            return (
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
              }}
              hasNext
              onNext={() => {
                console.log("Next");
              }}
            />
            <Button onClick={() => setNextClicked(true)} primary>Next</Button>
          </div>
        </div>
      </>}
    </Page>
  );
}
