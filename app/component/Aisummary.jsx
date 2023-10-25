import React from 'react'
import { DataTable, Card, Text, Checkbox, IndexTable, Page, Badge, Tag, HorizontalStack, VerticalStack, Button, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from 'react';
const summary = () => {
  const [checked, setChecked] = useState(false);
  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140,],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83],
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$445.00',
      124518,
      32,
    ],
  ];
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
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

            <div className="component-selectedcard">
              <span>Russian</span>
            </div>
            <div className="component-selectedcard">
              <span>Chinese</span>
            </div>
            <div className="component-selectedcard">
              <span>French</span>
            </div>
            <div className="component-selectedcard">
              <span>Italian</span>
            </div>
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
            totals={['', 2000, 8000, '$0']}
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
