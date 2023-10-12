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
} from "@shopify/polaris";
import styles from "~/styles/showpageword.css";
import { useState, useCallback} from "react";
import { authenticate } from "~/shopify.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
   const response = await admin.rest.get({ path: "/pages.json" });
      const pages = await response.json();
       return json({ pages });
}
const showpageword = () => {
  const {pages}=useLoaderData();
  const [selected, setSelected] = useState([""]);
  const [secondclicked, setSecondClicked] = React.useState(false);
  const handleChange = useCallback((value) => {
    setSecondClicked(true);
    setSelected(value);
  }, []);
  console.log("these are pages",pages)
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <Page>
      <Card>
        <Text variant="headingMd" as="h1">
          Lorem ipsum dolor sit amet
        </Text>
        <Text fontWeight="regular" variant="headingSm" as="p">
          Lorem ipsum dolor sit amet
        </Text>
        <HorizontalStack>
          <Tag onRemove={() => {}}>Russia</Tag>
          <Tag onRemove={() => {}}>Chinese</Tag>
          <Tag onRemove={() => {}}>French</Tag>
          <Tag onRemove={() => {}}>Italian</Tag>
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
    </Page>
  );
};
export default showpageword;
