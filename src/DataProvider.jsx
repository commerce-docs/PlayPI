import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchCategories from './api/fetchCategories';
import fetchProducts from './api/fetchProducts';
import fetchDetails from './api/fetchDetails';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [dataStore, setDataStore] = useState({
    categoryLevel: '2',
    selectedCategory: 'MTg=',
    selectedProduct: null,
    selectedOption: null,
    categories: [],
    products: [],
    productDetails: null,
    configurableOptions: [],
    isConfigurableProduct: false,
    hasCustomAttributes: false,
    modalIsOpen: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  /*********************/
  /* Get Categories    */
  /*********************/
  useEffect(() => {
    const fetchCatagoriesData = async (categoryLevel) => {
      try {
        const categories = await fetchCategories(categoryLevel);

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

  /*******************/
  /* Get Products    */
  /*******************/
  useEffect(() => {
    const fetchProductsData = async (selectedCategory) => {
      try {
        const products = await fetchProducts(selectedCategory);
        setDataStore((prevData) => ({
          ...prevData,
          products: products,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setIsLoading(false);
    fetchProductsData(dataStore.selectedCategory);
  }, [dataStore.selectedCategory]);

  /*******************/
  /* Get Details     */
  /*******************/
  useEffect(() => {
    const fetchDetailsData = async () => {
      if (dataStore.selectedProduct) {
        try {
          const productDetails = await fetchDetails(dataStore.selectedProduct);

          setDataStore((prevData) => ({
            ...prevData,
            productDetails: productDetails,
          }));
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };
    fetchDetailsData(dataStore.selectedProduct);
  }, [dataStore.selectedProduct]);

  /*********************/
  /* Configure Details */
  /*********************/
  useEffect(() => {
    if (dataStore.productDetails) {
      try {
        setDataStore((prevData) => ({
          ...prevData,
          configurableOptions: dataStore.productDetails.configurable_options || [],
          isConfigurableProduct:
            Boolean(dataStore.productDetails.configurable_options?.length > 0) || false,
          hasCustomAttributes:
            Boolean(dataStore.productDetails.custom_attributes?.length > 0) || false,
        }));

        // Open modal after product details are loaded
        openModal(true);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }, [dataStore.productDetails]);

  /*************************/
  /* Data Update Functions */
  /*************************/

  function updateCategory(selectedCategory) {
    setDataStore((prevData) => ({
      ...prevData,
      selectedCategory: selectedCategory,
      selectedProduct: '',
    }));
  }

  function updateProduct(selectedProduct) {
    setDataStore((prevData) => ({
      ...prevData,
      selectedProduct: selectedProduct,
    }));
  }

  function updateOption(selectedOption) {
    setDataStore((prevData) => ({
      ...prevData,
      selectedOption: selectedOption,
    }));
  }

  function openModal(open = false) {
    setDataStore((prevData) => ({
      ...prevData,
      modalIsOpen: open,
    }));
  }

  return (
    <DataContext.Provider
      value={{
        dataStore,
        isLoading,
        setDataStore,
        updateCategory,
        updateProduct,
        updateOption,
        openModal,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataStore = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataProvider');
  }
  return context;
};

export default DataProvider;
