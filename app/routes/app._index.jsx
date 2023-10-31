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
import Humansummary from "~/component/Humansummary";
import styles from "~/styles/showpageword.css";
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { Link, useActionData, useLoaderData, useLocation } from "@remix-run/react";
import { stripHtml } from "string-strip-html";
import wordsCount from 'words-count';
import Shop from '~/models/Shop.server';
import componentstyles from "~/styles/summary.css";
export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: componentstyles }
];
export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const response = await admin.rest.get({ path: "/pages.json" });
  const shopobj = new Shop(session.shop, admin.graphql);
  const fetchedlanguages = await shopobj.fetchLanguages();
  const translatedPages = await shopobj.getTranslatedPages();
  const pages = await response.json();
  const getShop = await shopobj.getShop();
  const WordsCount = await shopobj.getPlansWordCount();

  return json({ pages, fetchedlanguages, getShop, WordsCount, translatedPages });
}
export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql);
  const { totalWords, translatedpages, action } = await request.json();
  let storeUsedWords;
  let translatedresponse;
  if (action === "TotalWordsCount") {
    storeUsedWords = await shop.addWordsUsage(totalWords);
  }
  if (action === "saveTranslation") {
    translatedresponse = shop.saveTranslations(translatedpages);
  }
  return json({
    storeUsedWords,
  });
}
const showpageword = () => {
  const location = useLocation();
  const { pages, fetchedlanguages, getShop, WordsCount, translatedPages } = useLoaderData();
  const actiondata = useActionData();
  const storedWordsResult = actiondata?.storeUsedWords;
  const [selected, setSelected] = useState([""]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const [selectedLanguages, setselectedLanguages] = useState([])
  const [showSummary, setShowSummary] = useState(false);
  const [words, setWords] = useState(0)
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);
  useEffect(() => {
    setShowSummary(false);
    setIsClicked(false);
  }, [storedWordsResult]);
  useEffect(() => {
    console.log("fetched pages are", translatedPages)
  }, [translatedPages])
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];
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
        if (!selectedPages.some(page => page.id === pageFound.id)) {
          setSelectedPages(pages => [...pages, pageFound]);
        }
        const strippedHtml = stripHtml(pageFound.body_html).result;
        totalWords += wordsCount(strippedHtml);
      }
    });
    setWords(totalWords);
  }, [choiceSelected]);
  useEffect(() => {
    console.log(selectedPages)
  }, [selectedPages])
  const handleCheckboxChange = (newChecked, data) => {
    if (newChecked) {
      setChoiceSelected((prev) => [...prev, data]);
    } else {
      const pageFound = pages.pages.find((val) => val.id === data.id);
      const strippedHtml = stripHtml(pageFound.body_html).result;
      setWords((prev) => prev - wordsCount(strippedHtml));
      setSelectedPages((prev) => prev.filter((page) => page.id !== pageFound.id));
      setChoiceSelected((prev) => prev.filter((choice) => choice.id !== data.id));
    }
  };
  const translatePages = () => {
    setShowSummary(true);
    console.log("i am being clicked");
  };
  return (
    <Page
      fullWidth>
      {
        showSummary ? <Humansummary totalwords={words} targetlanguages={selectedLanguages} wordsUsed={getShop.wordsUsed} WordsCount={WordsCount} pages={selectedPages} /> : <> <div style={{ height: '70px' }}>
          <Card>
            <div className='header-section'>
              <span className='back-arrow-container'>
                <Link to={location.state?.prevurl ? location.state.prevurl : ""}>
                  <Icon
                    source={MobileBackArrowMajor}
                    tone="base"
                  /></Link></span>
              <div className="navLinks">
                <Link to="/app" state={{ prevurl: "/app" }} style={{
                  borderBottom: location.pathname === '/app' ? '2px solid #00805F' : 'none',
                }}>Page</Link>
                <Link to="/app/showproduct" state={{ prevurl: "/app" }}>Product</Link>
                <Link to="/app/settings" state={{ prevurl: "/app" }}>Setting</Link>
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
                          onClick={translatePages}
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
          </Grid></>
      }
      {
        translatedPages && translatedPages.length > 0 && (
          translatedPages.map(translatedPage => {
            const page = pages.pages.find(page => page.id.toString() === translatedPage.pageId.toString());
            if (selectedPages.some(selectedPage => selectedPage.id === page.id)) {
              console.log("current page", page, "current translatedPage", translatedPage);

              return (
                <Card key={translatedPage.id}>
                  <div className="pages-data">
                    <h1 className='page-title'>{page.title}</h1>
                    <p className='Language'>Language: {translatedPage.language}</p>
                    <p className='html-data'>Translation: {translatedPage.translation.substring(0, 500) + '...'}</p>
                    <Button>Show more</Button>
                  </div>
                </Card>
              );
            } else {
              return null;
            }
          })
        )
      }
    </Page>
  );
};
export default showpageword;
