import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts, fetchDetails } from '@/queries/fetchers';

export default function useDataStore() {
  const [dataStore, setDataStore] = useState({
    categories: null,
    products: null,
    productDetails: null,
    parentId: 2, // Main product categories
    selectedCategoryId: null,
    selectedProductSku: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await fetchCategories();
        const selectedCategoryId = dataStore.selectedCategoryId || categoriesResult.items[0].uid;

        const productsResult = await fetchProducts(selectedCategoryId);
        // const selectedProductSku = dataStore.selectedProductSku || productsResult.items[0].sku;

        setDataStore((prevData) => ({
          ...prevData,
          categories: categoriesResult.items,
          products: productsResult.items,
          selectedCategoryId: selectedCategoryId,
          // selectedProductSku: selectedProductSku,
        }));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dataStore.selectedCategoryId]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (dataStore.selectedProductSku) {
          const productDetailsResult = await fetchDetails(dataStore.selectedProductSku);

          setDataStore((prevData) => ({
            ...prevData,
            productDetails: productDetailsResult,
          }));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [dataStore.selectedProductSku, dataStore.productDetails]);

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
