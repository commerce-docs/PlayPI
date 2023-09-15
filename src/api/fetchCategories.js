/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

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
