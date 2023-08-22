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
    selectedCategory: null,
    selectedProduct: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatagoriesData = async (categoryLevel) => {
      try {
        const categoriesResult = await fetchCategories(categoryLevel);
        // Select first category as default
        const selectedcategoryLevel = categoriesResult.items[0].uid;

        setDataStore((prevData) => ({
          ...prevData,
          categories: categoriesResult.items,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCatagoriesData(dataStore.categoryLevel);
  }, [dataStore.categoryLevel]);

  useEffect(() => {
    const fetchProductsData = async (selectedCategory) => {
      try {
        const productsResult = await fetchProducts(selectedCategory);

        // const selectedProduct = dataStore.selectedProduct || productsResult.items[0].sku;

        setDataStore((prevData) => ({
          ...prevData,
          products: productsResult.items,
          selectedcategoryLevel: selectedcategoryLevel,
          // selectedProduct: selectedProduct,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProductsData(dataStore.selectedCategory);
  }, [dataStore.selectedCategory]);

  useEffect(() => {
    const fetchDetailsData = async () => {
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
    fetchDetailsData();
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
