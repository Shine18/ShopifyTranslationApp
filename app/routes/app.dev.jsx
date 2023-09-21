
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Card, Text, IndexTable, Page, Badge } from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};

const pages = [
  {
    title: "Select Plan",
    filename: "app.selectPlan.jsx",
    url: "/app/selectPlan",
    status: <Badge progress="incomplete">In Dev</Badge>
  },{
    title:'select language screen',
    filename:'app.languageselection',
    url:'/app/languageselection',
    status:<Badge progress="incomplete">In DEV</Badge>
  }
]

export default function DevRoute() {
  const tableRows = pages.map((page, index) => <IndexTable.Row
    id={page.filename}
    key={index}
    position={index}
  >
    <IndexTable.Cell>
      <Text variant="bodyMd" fontWeight="bold" as="span">
        {page.title}
      </Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {page.filename}
    </IndexTable.Cell>
    <IndexTable.Cell>
      In Dev
    </IndexTable.Cell>
  </IndexTable.Row>)

  return <Page>
    <ui-title-bar title="Dev Pages List" />

    <Card>
      <IndexTable
        selectable={false}
        headings={[
          { title: "Title" },
          { title: "FileName" },
          { title: "Status" }
        ]}
        resourceName={{ singular: "Page", plural: "Pages" }}
        itemCount={pages.length}
      >
        {tableRows}
      </IndexTable>
    </Card>
  </Page>
}
