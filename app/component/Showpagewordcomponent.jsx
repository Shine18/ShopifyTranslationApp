import Humansummary from './Humansummary'
import React from 'react';
import {
  Card,
  Text,
  IndexTable,
  Page,
  Badge,
  Tag,
  HorizontalStack,
  VerticalStack,
  Button,
  ChoiceList,
  Checkbox,
  Frame,
  TopBar,
  Grid,
  Icon
} from "@shopify/polaris";
import {
  MobileBackArrowMajor
} from '@shopify/polaris-icons';
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
const showpageword = ({ words, selectedLanguages, getShop, WordsCount, products }) => {
  const location = useLocation();
  const [selected, setSelected] = useState([""]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);
  console.log("my my words", words)
  const [isClicked, setIsClicked] = React.useState(false);
  const [lastclicked, setLastClicked] = React.useState(false)
  const [choiceSelected, setChoiceSelected] = useState([]);
  const handleSelectChange = (newSelected) => { console.log(newSelected) }
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
  return (
    <>
      {lastclicked ? <Humansummary products={products} totalwords={words} targetlanguages={selectedLanguages} wordsUsed={getShop.wordsUsed} WordsCount={WordsCount} /> : <>
        <div style={{ height: '70px' }}>

        </div>

        <Grid.Cell area='maincontent'>
          <Card>
            <Text variant="headingMd" as="h1">
              Lorem ipsum dolor sit amet
            </Text>
            <Text fontWeight="regular" variant="headingSm" as="p">
              Lorem ipsum dolor sit amet
            </Text>
            <HorizontalStack>
              <div className="component-pgwordtag">
                {
                  selectedLanguages.map(lang => {
                    const option = optionstwo.find(option => option.value === lang);
                    return option ?
                      <Tag>
                        {option.label}
                      </Tag> : null;
                  })
                }
              </div>
            </HorizontalStack>

            <Text variant="headingMd" as="h1">
              Total words
            </Text>
            <div id="totalbutton">
              <Text fontWeight="regular" variant="headingSm" as="p">
                {words}
              </Text>
              {isClicked ? (
                ``
              ) : (
                <Button
                  onClick={() => setIsClicked(true)}
                  textAlign="center"
                  primary="true"
                >
                  Next
                </Button>
              )}
            </div>
          </Card>

          {isClicked ? (
            <div id="secondcard">
              <Card>
                <ChoiceList
                  title="Company name"
                  choices={[
                    {
                      label: "Artificial Intelligence",
                      value: "AI",
                      helpText: " Lorem ipsum dolor sit amet",
                    },
                    {
                      label: "Human",
                      value: "Human",
                      helpText: " Lorem ipsum dolor sit amet",
                    },
                  ]}
                  selected={selected}
                  onChange={handleChange}
                />
                {secondclicked ? (
                  <div id="secondcardbutton">
                    <Button
                      onClick={() => setLastClicked(true)}
                      textAlign="center"
                      primary="true"
                    >
                      Next
                    </Button>
                  </div>
                ) : (
                  ``
                )}
              </Card>
            </div>
          ) : (
            ""
          )}
        </Grid.Cell>
      </>}

    </>
  );
};
export default showpageword;
