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
import styles from "~/styles/showpageword.css";
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
export const links = () => [{ rel: "stylesheet", href: styles }];


const showpageword = () => {
  const location = useLocation();
  
  const [selected, setSelected] = useState([""]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);

  const [isClicked, setIsClicked] = React.useState(false);
  const [lastclicked,setLastClicked]=React.useState(false)
  const [choiceSelected, setChoiceSelected] = useState([]);

  const handleSelectChange = (newSelected) => { console.log(newSelected) }

  return (
   <>
      {lastclicked?<Humansummary></Humansummary>:<>
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
              <Tag onRemove={() => { }}>Russia</Tag>
              <Tag onRemove={() => { }}>Chinese</Tag>
              <Tag onRemove={() => { }}>French</Tag>
              <Tag onRemove={() => { }}>Italian</Tag>
            </HorizontalStack>

            <Text variant="headingMd" as="h1">
              Total words
            </Text>
            <div id="totalbutton">
              <Text fontWeight="regular" variant="headingSm" as="p">
                1200
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
                      label: "Hidden",
                      value: "hidden",
                      helpText: "Company name will be hidden.",
                    },
                    {
                      label: "Optional",
                      value: "optional",
                      helpText: "Company name will be optional.",
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
