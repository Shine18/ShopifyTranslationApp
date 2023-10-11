import prisma from "~/db.server";
export default class Product {
  constructor(shop, graphql) {
    this.shopUrl = shop;
    this.graphql = graphql;
  }
  async getProducts() {
    try {
      const response = await this.graphql(`
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              handle
              images(first:1) {
                edges {
                  node{
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    `);
      const data = await response.json();
      console.log("this is product data", data);
      return data;
    } catch (e) {
      console.log("Error occurred:");
      console.log(e);
    }
  }
}
