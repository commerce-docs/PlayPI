import { CATEGORIES_QUERY } from '@/queries/ProductCategoriesQuery';
import { PRODUCTS_QUERY } from '@/queries/ProductsQuery';
import { PRODUCT_DETAILS_QUERY } from '@/queries/ProductDetailsQuery';
import { endpoint } from '@/queries/endpoint';

const fetchCategories = async () => {
  const parentId = '2';
  const query = CATEGORIES_QUERY;
  const variables = { parentId: parentId };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return data.data.categories;
};

const fetchProducts = async (selectedCategoryId) => {
  const query = PRODUCTS_QUERY;
  const variables = { categoryUid: selectedCategoryId };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();

  return data.data.products;
};

const fetchDetails = async (selectedProductSku) => {
  const query = PRODUCT_DETAILS_QUERY;
  const variables = { sku: selectedProductSku };
  const url = endpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  console.log('🚀 fetchDetails ~ data:', data.data);

  return data.data;
};

export { fetchCategories, fetchProducts, fetchDetails };
