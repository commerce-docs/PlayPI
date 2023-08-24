import { endpoint } from '@/queries/endpoint';

const PRODUCT_CATEGORIES = `
  query ProductCategories($categoryLevel: String!) {
    categories(filters: { parent_id: { eq: $categoryLevel } }, currentPage: 1) {
      total_count
      items {
        uid
        level
        name
        path
        image
        children_count
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

const fetchCategories = async (categoryLevel = '2') => {
  const query = PRODUCT_CATEGORIES;
  const variables = { categoryLevel: categoryLevel };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  console.log(
    '🚀 ~ file: fetchCategories.js:37 ~ fetchCategories ~ data.data.categories:',
    data.data.categories,
  );
  return data.data.categories;
};

export default fetchCategories;