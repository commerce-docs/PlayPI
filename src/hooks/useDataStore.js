import { useState, useEffect } from 'react';
import { fetchProducts } from '@/queries/productDataFetchers';
import { fetchCategories } from '@/queries/productDataFetchers';
import { fetchDetails } from '@/queries/productDataFetchers';

export default function useDataStore() {
  const [dataStore, setDataStore] = useState({
    categories: null,
    products: null,
    details: null,
    parentId: 2, // Main product categories
    selectedCategoryId: null,
    selectedProductSku: null,
    modalIsOpen: false,
    productDetailsLoaded: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((categoriesResult) => {
      setDataStore((prevData) => ({
        ...prevData,
        categories: categoriesResult.items,
      }));
      const selectedCategoryId = categoriesResult.items[0].uid;
      updateSelectedCategoryID(selectedCategoryId);

      fetchProducts(selectedCategoryId).then((productsResult) => {
        setDataStore((prevData) => ({
          ...prevData,
          products: productsResult.items,
        }));

        const selectedProductSku = productsResult.items[0].sku;
        updateSelectedProductSku(selectedProductSku);

        fetchDetails(selectedProductSku).then((productDetailsResult) => {
          setDataStore((prevData) => ({
            ...prevData,
            details: productDetailsResult,
          }));
          setIsLoading(false);
        });
      });
    }, []);
  });

  const updateSelectedCategoryID = (selectedCategoryId) => {
    setDataStore((prevData) => ({
      ...prevData,
      selectedCategoryId: selectedCategoryId,
    }));
  };

  const updateSelectedProductSku = (selectedProductSku) => {
    setDataStore((prevData) => ({
      ...prevData,
      selectedProductSku: selectedProductSku,
    }));
  };

  const getProductBySku = (sku) => {
    return dataStore.products.find((product) => product.sku === sku);
  };

  return {
    dataStore,
    isLoading,
    updateSelectedCategoryID,
    updateSelectedProductSku,
    getProductBySku,
  };
}
