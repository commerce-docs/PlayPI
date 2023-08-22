import { useState, useEffect } from 'react';
import fetchCategories from '@/queries/fetchCategories';
import fetchProducts from '@/queries/fetchProducts';
import fetchDetails from '@/queries/fetchDetails';

const useDataStore = () => {
  const [dataStore, setDataStore] = useState({
    categoryLevel: '2',
    selectedCategory: 'MTg=',
    selectedProduct: '',
    categories: [],
    products: [],
    productDetails: null,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatagoriesData = async (categoryLevel) => {
      try {
        const categories = await fetchCategories(categoryLevel);

        console.log('prevData', prevData);

        setDataStore((prevData) => ({
          ...prevData,
          categories: categories,
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
        const products = await fetchProducts(selectedCategory);

        setDataStore((prevData) => ({
          ...prevData,
          products: products,
          selectedCategory: null,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setIsLoading(false);
    fetchProductsData(dataStore.selectedCategory);
  }, [dataStore.selectedCategory]);

  useEffect(() => {
    const fetchDetailsData = async () => {
      try {
        if (dataStore.selectedProduct) {
          const productDetails = await fetchDetails(dataStore.selectedProduct);

          setDataStore((prevData) => ({
            ...prevData,
            productDetails: productDetails,
          }));
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchDetailsData();
  }, [dataStore.selectedProduct]);

  function updateSelectedCategory(selectedCategory) {
    setDataStore((prevData) => ({
      ...prevData,
      selectedCategory: selectedCategory,
    }));
  }
  function updateSelectedProduct(selectedProduct) {
    setDataStore((prevData) => ({
      ...prevData,
      selectedProduct: selectedProduct,
    }));
  }

  return {
    dataStore,
    isLoading,
    updateSelectedCategory,
    updateSelectedProduct,
  };
};

export default useDataStore;
