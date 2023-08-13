import { gql } from '@apollo/client';

export default function ProductCategoriesQuery(parentId) {
  return gql`
    query {
      categories(filters: { parent_id: { eq: "2" } }, currentPage: 1) {
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
}
