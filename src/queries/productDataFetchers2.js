import { useQuery } from '@apollo/client';
import CategoriesQuery from './ProductCategoriesQuery';
import ProductsQuery from './ProductsQuery';
import ProductDetailsQuery from './ProductDetailsQuery';

const fetchCategories = () => {
  const { loading, error, data } = useQuery(CategoriesQuery('2'));

  return { data };
};

const fetchProducts = (selectedCategoryId) => {
  const { loading, error, data } = useQuery(ProductsQuery(selectedCategoryId));

  return { data };
};

const fetchDetails = (selectedProductSku) => {
  const { loading, error, data } = useQuery(ProductDetailsQuery(selectedProductSku));

  return { data };
};

export { fetchCategories, fetchProducts, fetchDetails };
