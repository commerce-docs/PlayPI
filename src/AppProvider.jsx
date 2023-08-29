import React, { createContext, useContext, useEffect, useReducer } from 'react';
import fetchCategories from './api/fetchCategories';
import fetchProducts from './api/fetchProducts';
import fetchDetails from './api/fetchDetails';
import separateOptions from './utils/separateOptions';

const AppContext = createContext();

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

const AppProvider = ({ children }) => {
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
    <AppContext.Provider
      value={{
        ...state,
        updateCategory,
        updateProduct,
        updateColorOption,
        updateSizeOption,
        openModal,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppProvider = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useProductsProvider must be used within the ProductsProvider'
    );
  }
  return context;
};

export default AppProvider;
