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
  console.log('🚀selectedCategory:', selectedCategory);
  const query = PRODUCT_LIST;
  const variables = { selectedCategory: selectedCategory };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  console.log('🚀 data:', data);
  return data.products.items;
};

export default fetchProducts;
