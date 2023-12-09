import React, { useEffect } from 'react'
import { DataTable, Card, Text, Checkbox,  Page,  Tag, HorizontalStack,  Button } from "@shopify/polaris";
import { useState, useCallback } from 'react';
import {  useSubmit } from '@remix-run/react';
const summary = ({ totalwords, targetlanguages, wordsUsed, WordsCount, products = [], pages = [], translationmode, initiateRedirect, translatonPage = false, productPage = false }) => {
  const submit = useSubmit();
  const [checked, setChecked] = useState(false);
  const [productTranslations, setProductTranslations] = useState([]);
  const [pagesTranslations, setPagesTranslations] = useState([]);
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
  const totalLanguages = targetlanguages.length;
  const totalWordCount = totalLanguages * totalwords;
  const remainingWords = WordsCount - totalWordCount;
  const rows = targetlanguages.map((data, index) => {
    const optionLabel = optionstwo.find(option => option.value === data)?.label || '';
    return [optionLabel, totalwords, index === 0 ? WordsCount : index === 1 ? totalWordCount : '', 400]
  });
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
  let pagesToStore = [];
  let productsToStore = [];
  // saving to db for custom translation
  const initiateHumanTranslation = (content, targetlanguages, item, itemid, title) => {
    if (item === 'page') {
      const pagetostore = {
        page: content,
        targetlanguages: targetlanguages,
        id: itemid,
        pageTitle: title
      }
      console.log("pages to store is", pagetostore)
      // submit({ pagetostore: pagetostore, action: "store-page" },
      //   { replace: true, method: "POST", encType: "application/json" })
      pagesToStore.push(pagetostore);
    }
    if (item === 'product') {
      const producttostore = {
        product: content,
        targetlanguages: targetlanguages,
        id: itemid,
        productTitle: title
      }
      console.log("product to store is", producttostore)
      productsToStore.push(producttostore);
      // submit({ producttostore: producttostore, action: "store-product" },
      //   { replace: true, method: "POST", encType: "application/json" })
    }

  }
  // translation callback
  const addwords = useCallback(() => {
    if (translationmode[0] === "Human") {
      if (pages) {
        pages.forEach((value) => {
          initiateHumanTranslation(value.body_html, targetlanguages, 'page', value.id, value.title);
        });
      }

      if (products) {
        products.forEach((product) => {
          initiateHumanTranslation(product.node.description, targetlanguages, 'product', product.node.id, product.node.title);
        });
      }
      if (pagesToStore.length) {
        submit({ pagetostore: pagesToStore, action: "store-page" }, { replace: true, method: "POST", encType: "application/json" });
      }

      if (productsToStore.length) {
        submit({ producttostore: productsToStore, action: "store-product" }, { replace: true, method: "POST", encType: "application/json" });
      }
      shopify.toast.show("Your order has been placed");
    }
    else {
      console.log("send to AI")
      if (pages) {
        pages.forEach((value) => {
          executeTranslationAPI(value.body_html, targetlanguages, 'html', value.id);
        });
      }

      if (products) {
        products.forEach((product) => {
          executeTranslationAPI(product.node.description, targetlanguages, 'text', product.node.id);
        });
      }
      submit({ totalWords: totalWordCount, action: "TotalWordsCount" },
        { replace: true, method: "POST", encType: "application/json" })
    }
  }, [submit, totalWordCount, pages, products, targetlanguages, translationmode])

  // translation via google
  const executeTranslationAPI = async (text, languages, format, id) => {
    shopify.toast.show("Translating Your Page");

    let translations = [];
    let products = [];

    for (let language of languages) {
      const params = {
        q: text,
        target: language,
        format,
      };

      let response = await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBHy7gpuKDGp1Tg1nqIzNb_-h72uiyODQc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      let data = await response.json();

      if (format === 'html') {
        translations.push({ id, language, data });
      } else {
        products.push(wrappingProducts(id, language, data));
      }
    }

    // Update the state at the end:
    setPagesTranslations(oldTranslations => [...oldTranslations, ...translations]);

    // assuming this returns a promise
    await Promise.all(products);
  }

  const wrappingProducts = (id, language, data) => {
    const newItem = { id, language, data };
    setProductTranslations(prevItems => [...prevItems, newItem]);
  }
  // after translating via google api saving to db
  useEffect(() => {
    const translatedpages = pagesTranslations;
    const transplatedproducts = productTranslations;
    if (translatonPage) {
      submit({ translatedpages: translatedpages, action: "saveTranslation" },
        { replace: true, method: "POST", encType: "application/json" })

    }

    if (productPage) {
      submit({ transplatedproducts: transplatedproducts, action: "saveTranslationProduct" },
        { replace: true, method: "POST", encType: "application/json" })
    }
  }, [pagesTranslations, submit, productTranslations, productPage, translatonPage])
  return (
    <Page>
      <Card>
        <Text variant="headingMd" as="h1">
          Summary
        </Text>
        <Text fontWeight="regular" variant="headingSm" as="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Text>
        <HorizontalStack>
          <div id="component-tagslanguage" style={{ display: 'flex', flexDirection: 'row' }}>
            {
              targetlanguages.map((val, index) => {
                const optionlabel = optionstwo.find(label => label.value === val)?.label;
                return (
                  <div key={index} className="component-selectedcard">
                    <Tag>{optionlabel}</Tag>
                  </div>
                )
              })
            }
          </div>
        </HorizontalStack>
      </Card>
      <div id="component-secondcard">
        <Card>
          <Text variant="headingMd" as="h1">
            TOTAL LOREM IPSUM
          </Text>

          <DataTable
            columnContentTypes={[
              'text',
              'numeric',
              'numeric',
              'numeric',
            ]}
            headings={[
              'Language',
              'Words',
              'subscription Words',
              'Cost',
            ]}
            rows={rows}
            totals={['', totalWordCount, remainingWords, '$0']}
            showTotalsInFooter
          />


          <Checkbox
            label="Basic checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <div id="component-secondcardbutton">
            <Button textAlign="center" primary="true" onClick={addwords}>
              Pay
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}
export default summary;
