import React, { useEffect } from 'react';
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
import styles from "~/styles/showpageword.css";
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import { stripHtml } from "string-strip-html";
import wordsCount from 'words-count';
import Shop from '~/models/Shop.server';
export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const response = await admin.rest.get({ path: "/pages.json" });
  const shopobj = new Shop(session.shop, admin.graphql);
  const fetchedlanguages = await shopobj.fetchLanguages();
  const pages = await response.json();
  return json({ pages, fetchedlanguages });
}
const showpageword = () => {
  const location = useLocation();
  const { pages, fetchedlanguages } = useLoaderData();
  const [selected, setSelected] = useState([""]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const [selectedLanguages, setselectedLanguages] = useState([])
  const [words, setWords] = useState(0)
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
  console.log("pages are", pages)
  useEffect(() => {
    if (fetchedlanguages)
      setselectedLanguages(fetchedlanguages.TargetLanguagesCode.split(','))
  }, [fetchedlanguages])
  const [isClicked, setIsClicked] = React.useState(false);
  const [choiceSelected, setChoiceSelected] = useState([]);
  const titles = [
    { title: '/404', id: 1 },
    { title: '/blogs', id: 2 },
    { title: '/cart', id: 3 },
    ...pages.pages.map(page => ({ title: '/' + page.title.toString().toLowerCase(), id: page.id }))
  ];
  const handleSelectChange = (newSelected) => { console.log(newSelected) }
  useEffect(() => {
    let totalWords = 0;
    choiceSelected.map((value) => {
      const pageFound = pages.pages.find((val) => val.id === value.id);
      if (pageFound) {
        const strippedHtml = stripHtml(pageFound.body_html).result;
        totalWords += wordsCount(strippedHtml);
      }
    });
    setWords(totalWords);
  }, [choiceSelected]);

  const handleCheckboxChange = (newChecked, data) => {
    if (newChecked) {
      setChoiceSelected((prev) => [...prev, data]);
    } else {
      const pageFound = pages.pages.find((val) => val.id === data.id);
      const strippedHtml = stripHtml(pageFound.body_html).result;
      setWords((prev) => prev - wordsCount(strippedHtml));
      setChoiceSelected((prev) => prev.filter((choice) => choice.id !== data.id));
    }
  };
  return (
    <Page
      fullWidth>
      <div style={{ height: '70px' }}>
        <Card>
          <div className='header-section'>
            <span className='back-arrow-container'>
              <Link to={location.state?.prevurl ? location.state.prevurl : ""}>
                <Icon
                  source={MobileBackArrowMajor}
                  tone="base"
                /></Link></span>
            <div className="navLinks">
              <Link to="/app/showpageword" state={{ prevurl: "/app/showpageword" }} style={{
                borderBottom: location.pathname === '/app/showpageword' ? '2px solid #00805F' : 'none',
              }}>Page</Link>
              <Link to="/app/showproduct" state={{ prevurl: "/app/showpageword" }}>Product</Link>
              <Link to="/app/setting" state={{ prevurl: "/app/showpageword" }}>Setting</Link>
            </div>
          </div>
        </Card>
      </div>
      <Grid columns={{ sm: 1, lg: 4 }}
        areas={{
          sm: [
            'sidebar',
            'maincontent',
          ],
          lg: [
            'sidebar maincontent maincontent maincontent'
          ],
        }}>
        <Grid.Cell area="sidebar">
          <Card>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px;" }}>
              {titles.map((data, index) => (
                <Checkbox
                  key={index}
                  label={data.title}
                  checked={choiceSelected.some(choice => choice.id === data.id)}
                  onChange={(newChecked) => {
                    handleCheckboxChange(newChecked, data);
                  }}
                />
              ))}
            </div>
          </Card>
        </Grid.Cell>
        <Grid.Cell area='maincontent'>
          <Card>
            <Text variant="headingMd" as="h1">
              Lorem ipsum dolor sit amet
            </Text>
            <Text fontWeight="regular" variant="headingSm" as="p">
              Lorem ipsum dolor sit amet
            </Text>
            <HorizontalStack>
              {
                selectedLanguages.map(lang => {
                  const option = optionstwo.find(option => option.value === lang);
                  return option ?
                    <Tag
                      onRemove={() => {
                        const updatedLanguages = selectedLanguages.filter(selectedLang => selectedLang !== lang);
                        setselectedLanguages(updatedLanguages);
                      }}
                    >
                      {option.label}
                    </Tag> : null;
                })
              }
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
                  disabled={choiceSelected.length < 1}
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
                  title="Select Translator"
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
                      onClick={() => setIsClicked(true)}
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
      </Grid>
    </Page>
  );
};
export default showpageword;
