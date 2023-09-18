import prisma from "~/db.server";
export default class Product {
  constructor(shop, graphql) {
    this.shopUrl = shop;
    this.graphql = graphql;
  }
  async getProducts() {
    const response = await this.graphql(`
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              handle
              productType
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `);
  console.log("this is product data",response.data)
    return response.data;
  }
}
