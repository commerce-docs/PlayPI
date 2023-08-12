import { gql } from '@apollo/client';

export default function ProductDetailsQuery(productSku) {
  return gql`
    query {
      products(filter: { sku: { eq: "${productSku}" } }) {
        items {
          name
          stock_status
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
          description {
            html
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
          sku
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
          media_gallery {
            label
            position
            url
          }
        }
      }
    }
  `;
}
