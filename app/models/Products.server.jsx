import prisma from "~/db.server";
export default class Product {
  $cursor;
  constructor(shop, graphql) {
    this.shopUrl = shop;
    this.graphql = graphql;
  }
  async getProducts() {
    try {
      const response = await this.graphql(`
      query {
        products(first: 10, ${this.$cursor ? `after: "${this.$cursor}"` : ""}) {
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
          pageInfo {
            hasNextPage
            endCursor
            startCursor
          }
        }
      }
    `);

      const data = await response.json();

      return data;
    } catch (e) {
      console.log("Error occurred:");
      console.log(e);
    }
  }
  async getProductsCursor(cursor) {
    let mycursor = cursor
    try {
      const response = await this.graphql(`
      query {
        products(first: 10, ${mycursor ? `after: "${mycursor}"` : ""}) {
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
          pageInfo {
            hasNextPage
            endCursor
            startCursor
          }
        }
      }
    `);

      const data = await response.json();

      return data;
    } catch (e) {
      console.log("Error occurred:");
      console.log(e);
    }
  }
  async getPrevProducts(cursor) {
    let mycursor = cursor
    console.log("my cursor",mycursor)
    try {
      const response = await this.graphql(`
      query {
        products(last: 10, ${mycursor ? `before: "${mycursor}"` : ""}) {
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
          pageInfo {
            hasNextPage
            endCursor
            startCursor
          }
        }
      }
    `);

      const data = await response.json();
      console.log("this is product data", data);
      console.log("cursor is", data.data.products.pageInfo)
      return data;
    } catch (e) {
      console.log("Error occurred:");
      console.log(e);
    }

  }
  async getProductById(productId) {
    try {
      const response = await this.graphql(`
      query {
        node(id: "${productId}") {
          ... on Product {
            id
            title
            description
            handle
            images(first:1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    `);

      const data = await response.json();

      console.log("this is single product data", data);
      return data;
    } catch (e) {
      console.log("Error occurred:");
      console.log(e);
    }
  }

}
