import React, { createContext, useContext, useReducer, useEffect } from 'react';
import fetchCategories from './api/fetchCategories';
import fetchProducts from './api/fetchProducts';
import fetchDetails from './api/fetchDetails';

const ProductsContext = createContext();

const initialState = {
  categoryLevel: '2',
  categories: [],
  options: [],
  products: [],
  productDetails: null,
  isConfigurableProduct: false,
  hasCustomAttributes: false,
  selectedCategory: 'MTg=',
  selectedProduct: null,
  selectedOption: null,
  modalIsOpen: false,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.categories };
    case 'SET_PRODUCTS':
      return { ...state, products: action.products, isLoading: false };
    case 'SET_PRODUCT_DETAILS':
      return {
        ...state,
        productDetails: action.productDetails,
        options: action.productDetails.configurable_options || [],
        isConfigurableProduct: Boolean(action.productDetails.configurable_options?.length > 0),
        hasCustomAttributes: Boolean(action.productDetails.custom_attributes?.length > 0),
      };
    case 'UPDATE_SELECTION':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const categories = await fetchCategories(state.categoryLevel);
        dispatch({ type: 'SET_CATEGORIES', categories });
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
      if (state.selectedProduct) {
        try {
          const productDetails = await fetchDetails(state.selectedProduct);
          dispatch({ type: 'SET_PRODUCT_DETAILS', productDetails });
          openModal(true);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    })();
  }, [state.selectedProduct]);

  const updateSelection = (payload) => dispatch({ type: 'UPDATE_SELECTION', payload });

  const updateCategory = (selectedCategory) => updateSelection({ selectedCategory });
  const updateProduct = (selectedProduct) => updateSelection({ selectedProduct });
  const updateOption = (selectedOption) => updateSelection({ selectedOption });
  const openModal = (open = false) => updateSelection({ modalIsOpen: open });

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        updateCategory,
        updateProduct,
        updateOption,
        openModal,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsProvider = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsProvider must be used within the ProductsProvider');
  }
  return context;
};

export default ProductsProvider;
