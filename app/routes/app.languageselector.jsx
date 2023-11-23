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
  Icon,
  Link
} from "@shopify/polaris";
import {
  MobileBackArrowMajor
} from '@shopify/polaris-icons';
import styles from "~/styles/languageselection.css";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import Shop from "~/models/Shop.server";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const shopobj = new Shop(session.shop, admin.graphql);
  const fetchedlanguages = await shopobj.fetchLanguages();
  return json({
    shop: session.shop.replace(".myshopify.com", ""),
    fetchedlanguages: fetchedlanguages
  });
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
  const { fetchedlanguages } = useLoaderData();
  const submit = useSubmit();
  const [selected, setSelected] = useState([]);
  const [selectedtwo, setSelectedtwo] = useState("Target language");
  const [popoverActive, setPopoverActive] = useState(false);
  const [basePopoverActive, setBasePopoverActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const storedResult = actiondata?.storeLanguageResult;
  useEffect(() => {
    if (fetchedlanguages)
      setSelectedOptions(fetchedlanguages.TargetLanguagesCode.split(','))
  }, [fetchedlanguages])
  useEffect(() => {
    if (storedResult) {

      navigate('/app');
    }
  }, [storedResult]);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const toggleBasePopoverActive = useCallback(
    () => setBasePopoverActive((basePopoverActive) => !basePopoverActive),
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
  const baseActivator = (
    <Button onClick={toggleBasePopoverActive} disclosure>
      Base Language
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
    { label: "English (United States)", value: "en-us" },
    { label: "Russian", value: "ru" },
  ];

  // const optionstwo = [
  //   { label: "English (United States)", value: "en-us" },
  //   { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
  //   { label: "Russian", value: "ru" },
  //   { label: "Chinese (Taiwan)", value: "zh-tw" },
  //   { label: "French (Standard)", value: "fr" },
  // ];
  const optionstwo = [
    { label: "English (United States)", value: "en-us" },
    { label: "Arabic (Saudi Arabia)", value: "ar-sa" },
    { label: "Russian", value: "ru" },
    { label: "Chinese (Taiwan)", value: "zh-tw" },
    { label: "French (Standard)", value: "fr" },
  ].map((option) => ({
    ...option,
    disabled: selected.includes(option.value),
  }));

  const storeLanguages = useCallback(() => {
    const baselanguage = selected;
    const targetlanguages = selectedOptions;
    submit(
      { blanguagecode: baselanguage, tlagnuagescode: targetlanguages },
      { replace: true, method: "POST", encType: "application/json" }
    );
  }, [selectedOptions, selected, submit]);
  return (
    <Page fullWidth>

      <ui-title-bar title="Dev Pages List" />
      <div id="cardwith2select">
        <Card>
          <div style={{ height: '70px' }}>

            <div className='header-section'>
              <span className='back-arrow-container'>
                <Link url="/app">
                  <Icon
                    source={MobileBackArrowMajor}
                    tone="base"
                  /></Link></span>
            </div>

          </div>
          <div id="LanguageCard">
            <Card>
              <div id="selectiondivs">
                <LegacyStack spacing="4">
                  {/* <Select
              options={options}
              onChange={handleSelectChange}
              value={selected}
            /> */}
                  <VerticalStack>
                    <div>
                      <Popover
                        active={basePopoverActive}
                        activator={baseActivator}
                        onClose={toggleBasePopoverActive}
                        sectioned
                      >
                        <ChoiceList
                          allowMultiple={false}
                          title="Base Language"
                          choices={options}
                          selected={selected}
                          onChange={handleSelectChange}
                        />
                      </Popover>
                    </div>
                  </VerticalStack>
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
            </Card>
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
                {/* <Tag>{selected}</Tag> */}
                {selected.length > 0 && (
                  <Tag>
                    {options.find((option) => option.value === selected.toString())?.label}
                  </Tag>
                )}
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
                      {optionstwo.find((find) => find.value === option)?.label}
                    </Tag>
                  ))}
                </div>

                {selectedOptions.length > 0 && selected.length > 0 && (
                  <div id="nextbutton">
                    <Button onClick={storeLanguages}>Next</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Page >
  );
}
