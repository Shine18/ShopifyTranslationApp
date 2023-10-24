import React from 'react'
import { DataTable,Card, Text,Checkbox, IndexTable, Page, Badge,Tag,HorizontalStack, VerticalStack,Button,ChoiceList } from "@shopify/polaris";
import styles from '~/styles/summary.css';
import {useState, useCallback} from 'react';
export const links = () => [{ rel: "stylesheet", href: styles }];
const summary=()=>{
    const [checked, setChecked] = useState(false);
    const rows = [
        ['Emerald Silk Gown', '$875.00', 124689, 140, ],
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
    return(
      <Page>
          <Card>
          <Text variant="headingMd" as="h1">
              Summary
          </Text>
          <Text fontWeight="regular" variant="headingSm" as="p">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
</Text>
              <HorizontalStack>
                <div id="tagslanguage" style={{display:'flex',flexDirection:'row'}}>
                  <div class="selectedcard">
                    <Tag>Russian</Tag>
                  </div>
                  <div  class="selectedcard">
                  <Tag >Chinese</Tag>
                  </div>
                  <div  class="selectedcard">
                  <Tag >French</Tag>
                  </div>
                  <div  class="selectedcard">
                  <Tag >Italian</Tag>
                  </div>
                  </div>
              </HorizontalStack>
          </Card>
          <div id="secondcard">
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
          totals={['',2000,8000,'$0']}
          showTotalsInFooter
        />


          <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
    <div id="secondcardbutton">
    <Button  textAlign="center" primary="true">
    Pay
</Button>
    </div>
</Card>
          </div>
      </Page>
    )
}
export default summary;