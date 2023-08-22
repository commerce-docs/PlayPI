import { endpoint } from '@/queries/endpoint';

const PRODUCT_LIST = `
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
  const query = PRODUCT_LIST;
  const variables = { selectedCategory: selectedCategory };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  console.log(
    '🚀 ~ file: fetchProducts.js:48 ~ fetchProducts ~ data.data.products.items:',
    data.data.products.items,
  );
  return data.data.products.items;
};

export default fetchProducts;
