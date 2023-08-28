import {endpoint} from './endpoint';

const PRODUCTS = `
  query ProductsQuery($selectedCategory: String!) {
    products(filter: { category_uid: { eq: $selectedCategory } }, pageSize: 12) {
      total_count
      page_info {
        current_page
        page_size
        total_pages
      }
      items {
        uid
        sku
        name
        media_gallery {
          label
          position
          url
        }
        stock_status
        price_range {
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

const fetchProducts = async (selectedCategory) => {
  const query = PRODUCTS;
  const variables = { selectedCategory: selectedCategory };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return data.data?.products?.items;
};

export default fetchProducts;
