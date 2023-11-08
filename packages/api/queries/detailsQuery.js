/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

export const DETAILS_QUERY = `
  query ProductDetailsQuery($productSku: String!) {
    products(filter: { sku: { eq: $productSku } }) {
      items {
        categories {
          uid
          name
        }
        name
        sku
        description {
          html
        }
        stock_status
        media_gallery {
          label
          position
          url
        }
        price_range {
          maximum_price {
            final_price {
              value
              currency
            }
          }
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
        custom_attributes {
          attribute_metadata {
            uid
            label
          }
          selected_attribute_options {
            attribute_option {
              uid
              label
            }
          }
        }
        ... on ConfigurableProduct {
          variants {
            product {
              uid
              sku
              stock_status
              media_gallery {
                label
                position
                url
              }
            }
          }
          configurable_options {
            uid
            label
            values {
              uid
              label
              swatch_data {
                __typename
                value
              }
            }
          }
        }

        ... on BundleProduct {
          items {
            sku
            title
            options {
              product {
                sku
                price_range {
                  minimum_price {
                    final_price {
                      value
                      currency
                    }
                  }
                  maximum_price {
                    final_price {
                      value
                      currency
                    }
                  }
                }
              }
            }
          }
        }
        ... on GroupedProduct {
          items {
            product {
              sku
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
                maximum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
          }
        }
        ... on DownloadableProduct {
          links_title
          downloadable_product_samples {
            title
            sample_url
            sort_order
          }
          downloadable_product_links {
            title
            sample_url
            sort_order
          }
        }
      }
    }
  }
`;
