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

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const response = await admin.rest.get({ path: "/pages.json" });
  const pages = await response.json();
  return json({ pages });
}
const showpageword = () => {
  const location = useLocation();
  const { pages } = useLoaderData();
  const [selected, setSelected] = useState([""]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);

  const [isClicked, setIsClicked] = React.useState(false);
  const [choiceSelected, setChoiceSelected] = useState([]);
  const titles = ['/404', '/blogs', '/cart', ...pages.pages.map(page => '/' + page.title.toString().toLowerCase())];

  const handleSelectChange = (newSelected) => { console.log(newSelected) }

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
              {titles.map((title, index) => (
                <Checkbox
                  key={index}
                  label={title}
                  checked={choiceSelected.includes(title)}
                  onChange={(newChecked) => {
                    if (newChecked) {
                      setChoiceSelected((choiceSelected) => [...choiceSelected, title]);
                    } else {
                      setChoiceSelected((choiceSelected) => choiceSelected.filter((item) => item !== title));
                    }
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
