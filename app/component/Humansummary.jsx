import React, { useEffect } from 'react'
import { DataTable, Card, Text, Checkbox, IndexTable, Page, Badge, Tag, HorizontalStack, VerticalStack, Button, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
const summary = ({ totalwords, targetlanguages, wordsUsed, WordsCount, products = [], pages = [] }) => {
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
  const addwords = useCallback(() => {
    if (pages) {
      pages.forEach((value) => {
        executeTranslationAPI(value.body_html, targetlanguages, 'html', value.id);
      });
    }

    if (products) {
      products.forEach((product) => {
        executeTranslationAPI(product.description, targetlanguages, 'text', product.id);
      });
    }
    submit({ totalWords: totalWordCount , action:"TotalWordsCount"},
      { replace: true, method: "POST", encType: "application/json" })
  }, [submit, totalWordCount, pages, products, targetlanguages])

  const executeTranslationAPI = (text, languages, format, id) => {
    shopify.toast.show("Translating Your Page");
    languages.forEach((language) => {
      const params = {
        q: text,
        target: language,
        format
      };

      fetch('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDd4uM6XAcs0lF4PF_qKrK7MtS29qikbCI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(data => {
          if (format === 'html') {
            setPagesTranslations(oldTranslations => [...oldTranslations, {id, language, data}]);
          } else {
            setProductTranslations(oldTranslations => [...oldTranslations, {id, language, data}]);
          }
        })
        .catch((error) => {
          console.error('Failed to translate:', error);
        });
    });
  }
  useEffect(() => {
    const translatedpages=pagesTranslations;
    const transplatedproducts=productTranslations;
    console.log("translated data", translatedpages);
    if(translatedpages){
      submit({ translatedpages: translatedpages, action:"saveTranslation" },
        { replace: true, method: "POST", encType: "application/json" })
    }
  }, [pagesTranslations, productTranslations,submit])
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
