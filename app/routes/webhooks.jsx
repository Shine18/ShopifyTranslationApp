import { authenticate } from "../shopify.server";
import db from "../db.server";
import Shop from "~/models/Shop.server";

export const action = async ({ request }) => {
  const { topic, shop, session, admin } = await authenticate.webhook(request);
  const shopobj = new Shop(shop,admin?.graphql)
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
        await shopobj.deleteMany();
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
