import React from 'react'
import { DataTable,Card, Text,Checkbox,Select, IndexTable,Pagination, Page, Badge,Tag,HorizontalStack, VerticalStack,Button,ChoiceList } from "@shopify/polaris";
import styles from '~/styles/settings.css';
import {useState, useCallback} from 'react';
export const links = () => [{ rel: "stylesheet", href: styles }];

const settings=()=>{

    const [selected, setSelected] = useState('today');
    const [checked, setChecked] = useState(false);
    const [countryupdate,setCountryUpdate]=React.useState(false)
    const handleChange = useCallback(
      (newChecked) => setChecked(newChecked),
      [],
    );
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
      );
      const options = [
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
      ];
    return(
        <Page>
<Card>
  <div id="firstcardfirstsection">
      
      <Card>
<div style={{display:'flex',flexDirection:'row'}}>
<Select
      
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
       <Select
    
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
</div>
      </Card>
  <Text fontWeight="bold" variant="headingMd">
        Base Language
    </Text>
    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur</Text>
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  </div>

<div id="firstcardsecondsection">
<Text fontWeight="bold" variant="headingMd">
    Target Language
</Text>
<Text>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
</Text>
<div id="tags">
<Tag onRemove={()=>{}}>Russian</Tag>
<Tag onRemove={()=>{}}>Chinese</Tag>
<Tag onRemove={()=>{}}>French</Tag>
<Tag onRemove={()=>{}}>Italian</Tag>
</div>
<div id="firstcardupdate">
    <Button>
        Update
    </Button>
</div>
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
<div style={{paddingTop:'0.5rem'}}>
    
{countryupdate?<div>
    <Text fontWeight="bold" variant="headingMd">
    Country
</Text>
<Text>
    United State
</Text>
</div>:<div id="lastselect">
<Select
      
      options={options}
      onChange={handleSelectChange}
      value={selected}
    /></div>}
</div>
<div id="firstcardupdate">
    {countryupdate?'':<Button onClick={(e)=>setCountryUpdate(true)}>
        Update
    </Button>}
</div>
</Card>
</div>
        </Page>
    )
}
export default settings;