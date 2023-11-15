export function appProductsFetch(cursor) {
  return `#graphql
 {
  products(first:10,  after: $cursor) {
    edges {
      node {
        id,
        title,
        handle,
        images(first:1) {
          edges {
            node{
              originalSrc
            }
          }
        }
      }
      pageInfo {
      hasNextPage
      endCursor
     }
    }
  }
}`
}
