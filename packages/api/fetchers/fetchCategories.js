/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { endpoint } from './endpoint';
import { CATEGORIES_QUERY } from '../queries/categoriesQuery';

export const fetchCategories = async (categoryLevel = '2') => {
  console.log(endpoint);
  const query = CATEGORIES_QUERY;
  const variables = { categoryLevel: categoryLevel };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    Accept: 'application/json',
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return data.data?.categories?.items;
};
