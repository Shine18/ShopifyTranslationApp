
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useState, useCallback, useEffect } from 'react';
import { Page, Checkbox, Select,Tag, Grid,Popover, ChoiceList, ButtonGroup, Button, Card, Text, HorizontalStack, VerticalStack } from "@shopify/polaris";
import styles from '~/styles/languageselection.css';


export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }) => {

  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};


export default function languageselection() {

  const [selected, setSelected] = useState('Base language');
  const [selectedtwo, setSelectedtwo] = useState('Target language');
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [checked, setChecked] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleChange = useCallback((selected) => setSelectedOptions(selected), []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Options
    </Button>
  );
  const handleRemove = useCallback((removedOption) => {
    setSelectedOptions(selectedOptions.filter(option => option !== removedOption));
}, [selectedOptions]);

    const handleSelectChange = useCallback(
      (value, d) => setSelected(value),
      [],
    );

    const optionsfour = [
      {
        value: 1,
        label: "Leanne Graham"
      },
      {
        value: 2,
        label: "Ervin Howell"
      }
    ];


    const handleChangethree = useCallback(
      (newChecked) => setChecked(newChecked),
      [],
    );
    const options = [
      { label: 'Base Language', value: 'Base Language' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' },
    ];

    const optionstwo = [
      { label: 'Target Language', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' },
    ];


    return <Page>
      <ui-title-bar title="Dev Pages List" />
<div id="cardwith2select">
<Card>


<Card>
        <div id="selectiondivs">
          
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
        sectioned>
          <ChoiceList
            allowMultiple
            title="Target Language"
            choices={options}
            selected={selectedOptions}
            onChange={handleChange}
          />
          </Popover>
            </div>
          </VerticalStack>


        </div>
      </Card>
</div>

      {selected != 'Base language' ? <div>
        <div>
          <Text fontWeight="bold" as="h1" variant="headingSm">Base Language</Text>
        </div>
        <div>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam reiciendis nihil excepturi, perspiciatis saepe reprehenderit minima et tempore facilis cumque non nisi sint corrupti, dolorum magni, quis nemo culpa repellendus?</Text>
        </div>
        <div>
          <Checkbox
            label={selected}
            checked={checked}
            onChange={handleChangethree}
            />
        </div>
      </div>
        : ''}
<div>
{selectedOptions?<div>
  {selectedOptions.length>0?<div style={{marginTop:'6%'}}>
    <div>
          <Text fontWeight="bold" as="h1" variant="headingSm">Target Language</Text>
        </div>
        <div>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam reiciendis nihil excepturi, perspiciatis saepe reprehenderit minima et tempore facilis cumque non nisi sint corrupti, dolorum magni, quis nemo culpa repellendus?</Text>
        </div>

  </div>:''}
<div style={{marginTop:'2%'}}>
{selectedOptions.map((option, index) => (
    <Tag key={index} onRemove={() => handleRemove(option)}>
      {option}
    </Tag>
  ))}
  </div>
{selectedOptions.length>0?
  <div id="nextbutton">
<Button>Next</Button>
</div>
:''}
</div>:''}
  </div>   

      
        </Card>
    </Page>
  }
