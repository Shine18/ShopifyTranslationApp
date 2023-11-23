import React from 'react'
import { authenticate } from "../shopify.server";
import {
  DataTable,
  LegacyStack,
  Icon,
  Card,
  Text,
  Popover,
  Checkbox,
  Select,
  IndexTable,
  Pagination,
  Page,
  Badge,
  Tag,
  HorizontalStack,
  VerticalStack,
  Button,
  ChoiceList
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import style from "~/styles/languageselection.css";
import Shop from "~/models/Shop.server";
import styles from '~/styles/settings.css';
import { Link, useActionData, useLoaderData, useLocation, useNavigate, useSubmit } from "@remix-run/react";
import {
  MobileBackArrowMajor
} from '@shopify/polaris-icons';
import { useState, useCallback, useEffect } from 'react';
export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: style }
];
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
const settings = () => {

  const location = useLocation();
  const actiondata = useActionData();
  const { fetchedlanguages } = useLoaderData();
  const submit = useSubmit();
  const [selected, setSelected] = useState([]);
  const [selectedtwo, setSelectedtwo] = useState("Target language");
  const [enableUpdate, setEnableUpdate] = useState(false);
  const [countryupdate, setCountryUpdate] = useState('');
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
  useEffect(() => {

    if (storedResult) {
      shopify.toast.show("Language Updated")
    }

  }, [storedResult])

  useEffect(() => {
    if (selected.length > 0 && selectedOptions.length > 0) {

      setEnableUpdate(true);
    }
    else {

      setEnableUpdate(false);
    }
  }, [selected, selectedOptions])
  return (
    <Page fullWidth>
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
      <Card>
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
                  <Button disabled={!enableUpdate} onClick={storeLanguages}>Update</Button>
                </div>
              )}
            </div>
          )}
        </div>


      </Card>

      <div id="secondcarddiv">
        <Card>
          <Text fontWeight="bold" variant="headingMd">
            Email
          </Text>
          <Text>
            Alteru@gmail.com
          </Text>
          <div style={{ paddingTop: '0.5rem' }}>

            {countryupdate ? <div>
              <Text fontWeight="bold" variant="headingMd">
                Country
              </Text>
              <Text>
                United State
              </Text>
            </div> : <div id="lastselect">
              <Select

                options={options}
                onChange={handleSelectChange}
                value={selected}
              /></div>}
          </div>
          <div id="firstcardupdate">
            {countryupdate ? '' : <Button onClick={(e) => setCountryUpdate(true)}>
              Update
            </Button>}
          </div>
        </Card>
      </div>
    </Page>
  )
}
export default settings;
