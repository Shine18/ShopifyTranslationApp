import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useState, useCallback, useEffect } from "react";
import {
  Page,
  Checkbox,
  Select,
  Tag,
  Grid,
  Popover,
  ChoiceList,
  ButtonGroup,
  Button,
  Card,
  Text,
  HorizontalStack,
  VerticalStack,
  LegacyStack,
} from "@shopify/polaris";
import styles from "~/styles/languageselection.css";
import { useActionData, useSubmit } from "@remix-run/react";
import Shop from "~/models/Shop.server";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};
export async function action({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shop = new Shop(session.shop, admin.graphql);
  const { blanguagecode, tlagnuagescode } = await request.json();
  const storeLanguageResult = await shop.addLanguages(
    blanguagecode,
    tlagnuagescode
  );
  return json({
    storeLanguageResult,
  });
}

export default function languageselection() {
  const actiondata = useActionData();
  const submit = useSubmit();
  const [selected, setSelected] = useState("Base language");
  const [selectedtwo, setSelectedtwo] = useState("Target language");
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [checked, setChecked] = useState(false);
  const storedResult = actiondata?.storeLanguageResult;

  useEffect(() => {
    if (storedResult) {
      console.log("this is the result baby", storedResult);
    }
  },[storedResult]);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleChange = useCallback(
    (selected) => setSelectedOptions(selected),
    []
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Target Language
    </Button>
  );
  const handleRemove = useCallback(
    (removedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== removedOption)
      );
    },
    [selectedOptions]
  );

  const handleSelectChange = useCallback((value, d) => setSelected(value), []);

  const optionsfour = [
    {
      value: 1,
      label: "Leanne Graham",
    },
    {
      value: 2,
      label: "Ervin Howell",
    },
  ];

  const handleChangethree = useCallback(
    (newChecked) => setChecked(newChecked),
    []
  );
  const options = [
    { label: "Base Language", value: "Base Language" },
    { label: "English (United States)", value: "en-us" },
    { label: "Russian", value: "ru" },
  ];

  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ];

  const storeLanguages = useCallback(() => {
    console.log("clicked");
    console.log(selectedOptions);
    console.log("selected", selected);
    const baselanguage = selected;
    const targetlanguages = selectedOptions;
    submit(
      { blanguagecode: baselanguage, tlagnuagescode: targetlanguages },
      { replace: true, method: "POST", encType: "application/json" }
    );
  }, [selectedOptions, selected, submit]);
  return (
    <Page>
      <ui-title-bar title="Dev Pages List" />
      <div id="cardwith2select">
        <Card>
          <div id="selectiondivs">
            <LegacyStack spacing="4">
            <Select
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
            <VerticalStack>
              <div>
                <Popover
                  active={popoverActive}
                  activator={activator}
                  onClose={togglePopoverActive}
                  sectioned
                >
                  <ChoiceList
                    allowMultiple
                    title="Target Language"
                    choices={optionstwo}
                    selected={selectedOptions}
                    onChange={handleChange}
                  />
                </Popover>
              </div>
            </VerticalStack>
            </LegacyStack>
          </div>

          {selected !== "Base language" && (
            <div>
              <div>
                <Text fontWeight="bold" as="h1" variant="headingSm">
                  Base Language
                </Text>
              </div>
              <div>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam reiciendis nihil excepturi, perspiciatis saepe
                  reprehenderit minima et tempore facilis cumque non nisi sint
                  corrupti, dolorum magni, quis nemo culpa repellendus?
                </Text>
              </div>
              <div>
                <Checkbox
                  label={selected}
                  checked={checked}
                  onChange={handleChangethree}
                />
              </div>
            </div>
          )}

          <div>
            {selectedOptions && (
              <div>
                {selectedOptions.length > 0 && (
                  <div style={{ marginTop: "6%" }}>
                    <div>
                      <Text fontWeight="bold" as="h1" variant="headingSm">
                        Target Language
                      </Text>
                    </div>
                    <div>
                      <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veniam reiciendis nihil excepturi, perspiciatis saepe
                        reprehenderit minima et tempore facilis cumque non nisi
                        sint corrupti, dolorum magni, quis nemo culpa
                        repellendus?
                      </Text>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: "2%" }}>
                  {selectedOptions.map((option, index) => (
                    <Tag key={index} onRemove={() => handleRemove(option)}>
                      {option}
                    </Tag>
                  ))}
                </div>

                {selectedOptions.length > 0 && (
                  <div id="nextbutton">
                    <Button onClick={storeLanguages}>Next</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Page>
  );
}
