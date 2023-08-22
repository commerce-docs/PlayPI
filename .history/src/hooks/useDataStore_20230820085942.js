import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts, fetchDetails } from '@/queries/fetchers';

export default function useDataStore() {
  const [dataStore, setDataStore] = useState({
    categories: null,
    products: null,
    productDetails: null,
    categoryLevel: 2, // Main product categories
    selectedcategoryLevel: null,
    selectedProduct: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await fetchCategories();
        const selectedcategoryLevel =
          dataStore.selectedcategoryLevel || categoriesResult.items[0].uid;

        const productsResult = await fetchProducts(selectedcategoryLevel);
        // const selectedProduct = dataStore.selectedProduct || productsResult.items[0].sku;

        setDataStore((prevData) => ({
          ...prevData,
          categories: categoriesResult.items,
          products: productsResult.items,
          selectedcategoryLevel: selectedcategoryLevel,
          // selectedProduct: selectedProduct,
        }));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dataStore.selectedcategoryLevel]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (dataStore.selectedProduct) {
          const productDetailsResult = await fetchDetails(dataStore.selectedProduct);

          setDataStore((prevData) => ({
            ...prevData,
            productDetails: productDetailsResult,
          }));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchDetails();
  }, [dataStore.selectedProduct, dataStore.productDetails]);

  return {
    dataStore,
    isLoading,
    updateSelectedCategoryLevel: (selectedcategoryLevel) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedcategoryLevel: selectedcategoryLevel,
      }));
    },
    updateSelectedProduct: (selectedProduct) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedProduct: selectedProduct,
      }));
    },
  };
}
