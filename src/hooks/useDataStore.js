import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts, fetchDetails } from '@/queries/fetchers';

export default function useDataStore() {
  const [dataStore, setDataStore] = useState({
    categories: null,
    products: null,
    details: null,
    parentId: 2, // Main product categories
    selectedCategoryId: null,
    selectedProductSku: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await fetchCategories();
        const selectedCategoryId = categoriesResult.items[0].uid;

        const productsResult = await fetchProducts(selectedCategoryId);
        const selectedProductSku = productsResult.items[0].sku;

        const productDetailsResult = await fetchDetails(selectedProductSku);

        setDataStore((prevData) => ({
          ...prevData,
          categories: categoriesResult.items,
          products: productsResult.items,
          details: productDetailsResult,
          selectedCategoryId,
          selectedProductSku,
        }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []); // Dependency array remains empty as no external dependencies

  return {
    dataStore,
    isLoading,
    updateSelectedCategoryID: (selectedCategoryId) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedCategoryId: selectedCategoryId,
      }));
    },
    updateSelectedProductSku: (selectedProductSku) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedProductSku: selectedProductSku,
      }));
    },
  };
}
