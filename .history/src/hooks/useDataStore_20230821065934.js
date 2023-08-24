import { useState, useEffect } from 'react';
import fetchCategories from '@/queries/fetchCategories';
import fetchProducts from '@/queries/fetchProducts';
import fetchDetails from '@/queries/fetchDetails';

const useDataStore = () => {
  const [dataStore, setDataStore] = useState({
    categoryLevel: '2',
    selectedCategory: 'MTU=',
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
        console.log('🚀 After fetchCategories:', categories);

        setDataStore((prevData) => ({
          ...prevData,
          categories: categories,
          selectedCategory: categories[0].uid, // set default
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
          selectedCategory: selectedCategory,
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
          const productDetails = await fetchDetails(selectedProduct);

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

  return {
    dataStore,
    isLoading,
    updateSelectedCategory: (selectedCategory) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedCategory: selectedCategory,
      }));
    },
    updateSelectedProduct: (selectedProduct) => {
      setDataStore((prevData) => ({
        ...prevData,
        selectedProduct: selectedProduct,
      }));
    },
  };
};

export default useDataStore;