import React from 'react'
import { DataTable, Card, Text, Checkbox, IndexTable, Page, Badge, Tag, HorizontalStack, VerticalStack, Button, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from 'react';
const summary = ({ totalwords, targetlanguages }) => {
  const [checked, setChecked] = useState(false);
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
  const rows = targetlanguages.map((data, index) => {
    const optionLabel = optionstwo.find(option => option.value === data)?.label || '';
    return [optionLabel, totalwords, index === 0 ? 10000 : '', 400]
  });
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
  console.log("these are total words", totalwords)
  const totalLanguages = targetlanguages.length;
  const totalWordCount = totalLanguages * totalwords;
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
            totals={['', totalWordCount, 8000, '$0']}
            showTotalsInFooter
          />


          <Checkbox
            label="Basic checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <div id="component-secondcardbutton">
            <Button textAlign="center" primary="true">
              Pay
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  )
}
export default summary;
