import { endpoint } from './endpoint';

const DETAILS = `
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

const fetchDetails = async (productSku) => {
  console.log('🚀 productSku:', productSku);
  const query = DETAILS;
  const variables = { productSku: productSku };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  console.log('returning data.data.products.items[0]:', data.data.products.items[0]);
  return data.data.products.items[0];
};

export default fetchDetails;
