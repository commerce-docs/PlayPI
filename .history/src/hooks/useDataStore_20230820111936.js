import { useState, useEffect } from 'react';
import fetchCategories from '@/queries/fetchCategories';
import fetchProducts from '@/queries/fetchProducts';
import fetchDetails from '@/queries/fetchDetails';

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
    const fetchCatagoriesData = async (categoryLevel) => {
      try {
        const categoriesResult = await fetchCategories();

        setDataStore((prevData) => ({
          ...prevData,
          categories: categoriesResult.items,
          selectedcategoryLevel: selectedcategoryLevel,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCatagoriesData(dataStore.categoryLevel);
  }, []);

  useEffect(() => {
    const fetchProductsData = async () => {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProductsData();
  }, []);

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
