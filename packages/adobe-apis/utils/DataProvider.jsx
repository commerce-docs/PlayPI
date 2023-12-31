/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {fetchCategories} from '../fetchers/fetchCategories';
import {fetchProducts} from '../fetchers/fetchProducts';
import {fetchDetails} from '../fetchers/fetchDetails';
import {separateOptions} from './separateOptions';

const DataContext = createContext();

const initialState = {
  categoryLevel: '2',
  categories: [],
  selectedCategory: 'MTg=',
  products: [],
  selectedProductSku: '',
  productDetails: null,
  colorOptions: [],
  colorOptionsLabel: '',
  sizeOptions: [],
  sizeOptionsLabel: '',
  selectedColorOption: null,
  selectedSizeOption: null,
  hasCustomAttributes: false,
  modalIsOpen: false,
  isLoading: true,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.categories };
    case 'SET_PRODUCTS':
      return { ...state, products: action.products, isLoading: false };
    case 'SET_PRODUCT_DETAILS':
      return {
        ...state,
        productDetails: action.productDetails,
        colorOptions: action.colorOptions,
        sizeOptions: action.sizeOptions,
        colorOptionsLabel: action.colorOptionsLabel,
        sizeOptionsLabel: action.sizeOptionsLabel,
        hasCustomAttributes: action.hasCustomAttributes,
      };
    case 'UPDATE_SELECTION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchCategories(state.categoryLevel);
        dispatch({ type: `SET_CATEGORIES`, categories });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    })();
  }, [state.categoryLevel]);

  useEffect(() => {
    (async () => {
      try {
        const products = await fetchProducts(state.selectedCategory);
        dispatch({ type: 'SET_PRODUCTS', products });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })();
  }, [state.selectedCategory]);

  useEffect(() => {
    (async () => {
      if (state.selectedProductSku) {
        try {
          const productDetails = await fetchDetails(state.selectedProductSku);
          const {
            colorOptions,
            sizeOptions,
            colorOptionsLabel,
            sizeOptionsLabel,
          } = separateOptions(productDetails.configurable_options);
          const hasCustomAttributes = Boolean(
            productDetails.custom_attributes?.length > 0
          );

          dispatch({
            type: 'SET_PRODUCT_DETAILS',
            productDetails,
            colorOptions,
            colorOptionsLabel,
            sizeOptions,
            sizeOptionsLabel,
            hasCustomAttributes,
          });
          openModal(true);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    })();
  }, [state.selectedProductSku]);

  const updateSelection = (payload) =>
    dispatch({ type: 'UPDATE_SELECTION', payload });

  const updateCategory = (selectedCategory) =>
    updateSelection({ selectedCategory });
  const updateProduct = (selectedProductSku) =>
    updateSelection({ selectedProductSku });
  const updateSizeOption = (selectedSizeOption) =>
    updateSelection({ selectedSizeOption });
  const updateColorOption = (selectedColorOption) =>
    updateSelection({ selectedColorOption });
  const openModal = (open = false) => updateSelection({ modalIsOpen: open });

  return (
    <DataContext.Provider
      value={{
        ...state,
        updateCategory,
        updateProduct,
        updateColorOption,
        updateSizeOption,
        openModal,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataProvider must be used within the DataProvider');
  }
  return context;
};
