export function appProductsFetch() {
  return `#graphql
 {
  products(first:10) {
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
    }
  }
}`
}
