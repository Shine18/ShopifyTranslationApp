import React, { useEffect } from 'react'
import { DataTable, Card, Text, Checkbox, IndexTable, Page, Badge, Tag, HorizontalStack, VerticalStack, Button, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
const summary = ({ totalwords, targetlanguages, wordsUsed, WordsCount, products = [], pages = [], translationmode, initiateRedirect }) => {
  const actiondata = useActionData();
  const submit = useSubmit();
  const [checked, setChecked] = useState(false);
  const [productTranslations, setProductTranslations] = useState([]);
  const [pagesTranslations, setPagesTranslations] = useState([]);
  const storedWordsResult = actiondata?.storeUsedWords;
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
  const initiateHumanTranslation = (content, targetlanguages, item, itemid) => {
    if (item === 'page') {
      const pagetostore = {
        page: content,
        targetlanguages: targetlanguages,
        id: itemid
      }
      console.log("pages to store is", pagetostore)
      submit({ pagetostore: pagetostore, action: "store-page" },
        { replace: true, method: "POST", encType: "application/json" })
    }
    if (item === 'product') {
      const producttostore = {
        product: content,
        targetlanguages: targetlanguages,
        id: itemid
      }
      console.log("product to store is", producttostore)
      submit({ producttostore: producttostore, action: "store-product" },
        { replace: true, method: "POST", encType: "application/json" })
    }
  }
  const addwords = useCallback(() => {
    if (translationmode[0] === "Human") {
      console.log("send it to human")
      if (pages) {
        pages.forEach((value) => {
          initiateHumanTranslation(value.body_html, targetlanguages, 'page', value.id);
        });
      }

      if (products) {
        console.log("these are products",products)
        products.forEach((product) => {
          console.log("single product",product)
          initiateHumanTranslation(product.node.description, targetlanguages, 'product', product.node.id);
        });
      }
      shopify.toast.show("Translating Your Page");
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

  const executeTranslationAPI = async (text, languages, format, id) => {
    shopify.toast.show("Translating Your Page");
    for( var language of languages) {
      const params = {
        q: text,
        target: language,
        format
      };

      await fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDA3RhXOeW-Rk-mexxxYHzYcaQD7FCTILE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(data => {
          console.log("page translated is ", data)
          if (format === 'html') {
            setPagesTranslations(oldTranslations => [...oldTranslations, { id, language, data }]);
          } else {
            setProductTranslations(oldTranslations => [...oldTranslations, { id, language, data }]);
          }

        })
        .catch((error) => {
          console.error('Failed to translate:', error);
        });

    }
    console.log("initiating redirect..")
    initiateRedirect(true)
    // languages.forEach((language) => {

    // });

  }
  useEffect(() => {
    const translatedpages = pagesTranslations;
    const transplatedproducts = productTranslations;
    console.log("translated data", translatedpages);
    console.log("translated data product", transplatedproducts);
    // if (translatedpages.length > 0) {
      submit({ translatedpages: translatedpages, action: "saveTranslation" },
        { replace: true, method: "POST", encType: "application/json" })
    // }
    // if (transplatedproducts.length > 0) {
    //   submit({ transplatedproducts: transplatedproducts, action: "saveTranslationProduct" },
    //   { replace: true, method: "POST", encType: "application/json" })
    // }
  }, [pagesTranslations, submit])
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
