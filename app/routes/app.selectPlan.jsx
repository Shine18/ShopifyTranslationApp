
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Page,Grid,ButtonGroup, Button,Card,Text,HorizontalStack,VerticalStack } from "@shopify/polaris";
import styles from '~/styles/selectPlan.css';
export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = async ({ request }) => {
  
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};


export default function SelectPlanRoute() {

  return <Page>
    <ui-title-bar title="Dev Pages List" />
    {/* add your code here */}
    <div id="selectPlandiv">
   <div>
      <Card id="cardd" title="Sales" sectioned>
      <Text fontWeight="bold" variant="headingXl" alignment="center" as="h1">
    Free
      </Text>
      <HorizontalStack wrap={false} align="center">
<div className="greychange">
<Text variant="bodySm" alignment="start" as="p">
        $
      </Text>
</div>
      <Text width="206px" fontWeight="bold" variant="heading3xl" alignment="start" as="h1">
        0 
      </Text>
      <VerticalStack align="end">
  <div className="greychange">
  <Text variant="bodySm" alignment="end" as="p">
        /m
      </Text>
  </div>
      </VerticalStack>
        </HorizontalStack>

        <VerticalStack inlineAlign="start" gap="3">
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <Text variant="bodySm" alignment="start" as="p">
        200 words
      </Text>

          </div>
  <VerticalStack align="start">
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  <Text variant="bodySm" alignment="start" as="p">
        Google workspace,
        
      </Text>
</div>
     <div className="exchange">
     <Text variant="bodySm" alignment="start" as="p">
        Exchange?
      </Text>
     </div>
  </VerticalStack>
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        Up to 12 responses
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Up to 3 survey results archieved
      </Text>
    </div>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        7 Days of insight report storage for past meetings
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        Knowledge base
      </Text>
</div>
        </VerticalStack>
<div class="buttononediv">
<Button textAlign="center" primary="true">Get free</Button>
</div>
      </Card>
   </div>
   <div id="midcard">
      <Card  title="Sales" className="cardtwo" sectioned>
        <div>
      <Text fontWeight="bold" variant="headingXl" alignment="center" as="h1">
    Personal
      </Text>
      <HorizontalStack wrap={false} align="center">
  <div className="greychange">
  <Text variant="bodySm" alignment="start" as="p">
        $
      </Text>
  </div>
      <Text width="206px" fontWeight="bold" variant="heading3xl" alignment="start" as="h1">
        9
      </Text>
      <VerticalStack align="end">
     <div className="greychange">
     <Text variant="bodySm" alignment="end" as="p">
        /m
      </Text>
     </div>
      </VerticalStack>
        </HorizontalStack>
        <ButtonGroup fullwidth="true" segmented="true">
     <div className="buttongroupbuttons">
     <Button>Monthly</Button>
      <Button primary>Anually</Button>
     </div>
       </ButtonGroup>
        <VerticalStack inlineAlign="start" gap="3">
        <div style={{marginTop:"20%",display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <Text variant="bodySm" alignment="start" as="p">
        100000 words
      </Text>
</div>
  <VerticalStack align="start">
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
  <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  <Text variant="bodySm" alignment="start" as="p">
        Google workspace,  Exchange?
        
      </Text>
</div>  
  </VerticalStack>
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
  <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        Up to 50 responses
      </Text>
 </div>
 <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
 <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Up to 10 survey results archieved
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        30 Days of insight report storage for past meetings
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Unlimited customization of questions
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
   Upto 5 survey templates
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
<svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fafafa"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#fffafa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
  Standard email & chat
      </Text>
</div>
        </VerticalStack>
        <div class="buttononedivtwo">
<Button textAlign="center" primary="true">Get free</Button>
</div>
</div>
      </Card>
   </div>
   <div>
      <Card title="Sales" sectioned>
      <Text fontWeight="bold" variant="headingXl" alignment="center" as="h1">
    Advanced
      </Text>
      <HorizontalStack wrap={false} align="center">
   <div className="greychange">
   <Text variant="bodySm" alignment="start" as="p">
        $
      </Text>
   </div>
      <Text width="206px" fontWeight="bold" variant="heading3xl" alignment="start" as="h1">
        19
      </Text>
      <VerticalStack align="end">
    <div className="greychange">
    <Text variant="bodySm" alignment="end" as="p">
        /m
      </Text>
    </div>
      </VerticalStack>
        </HorizontalStack>
        <VerticalStack inlineAlign="start" gap="3">
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <Text variant="bodySm" alignment="start" as="p">
        200000 words
      </Text>
</div>
  <VerticalStack align="start">
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  <Text variant="bodySm" alignment="start" as="p">
        Google workspace,
        
      </Text>
</div>
    <div className="exchange">
    
    <Text variant="bodySm" alignment="start" as="p">
        Exchange?
      </Text>
    </div>
  </VerticalStack>
  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
        Unlimited responses
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Unlimited survey results archieved
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Unlimited days of insight report storage for past meetings
      </Text>

</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Unlimited customization of questions
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Unlimited survey templates
      </Text>
</div>
<div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <svg width="25" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      <Text variant="bodySm" alignment="start" as="p">
      Priority email & chat
      </Text>
</div>
        </VerticalStack>
  <div class="buttononedivthree">
<Button textAlign="center" primary="true">Get free</Button>
</div>
      </Card>
   </div>
</div>
  </Page>
}
