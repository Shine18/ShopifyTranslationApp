import { Link, useActionData, useLoaderData, useLocation, useNavigate, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/node";
import Shop from "~/models/Shop.server";
import { authenticate } from "../shopify.server";
export async function loader({ request }) {
  const { session, admin } = await authenticate.admin(request);
  const shopobj = new Shop(session.shop, admin.graphql);
  const producttranslations = await shopobj.productTranslations();
  const pageTranslations = await shopobj.pageTranslations();
  return json({
    producttranslations,
    pageTranslations

  });
}
