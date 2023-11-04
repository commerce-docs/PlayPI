/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { endpoint } from './endpoint';

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
  const variables = { categoryLevel };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  return data.data?.categories?.items;
};

export default fetchCategories;
