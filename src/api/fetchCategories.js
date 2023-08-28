import {endpoint} from './endpoint';

const CATEGORIES = `
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
  const query = CATEGORIES;
  const variables = { categoryLevel: categoryLevel };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return data.data?.categories?.items;
};

export default fetchCategories;
