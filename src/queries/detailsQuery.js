import { gql } from '@apollo/client';

export default function getDetailsQuery(productSku) {
  return gql`
    query {
      products(filter: { sku: { eq: "${productSku}" } }) {
        total_count
        items {
          id
          sku
          name
          categories {
            name
          }
          price_range {
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
            stock_status
            configurable_options {
              label
              values {
                label
                swatch_data {
                  value
                }
              }
            }
          }
          custom_attributes {
            attribute_metadata {
              label
            }
            selected_attribute_options {
              attribute_option {
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
