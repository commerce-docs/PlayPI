import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './queries/apolloClient';

import ProductCategories from './components/ProductCategories';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './main.css';

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState('MTg=');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCategorySelect = (categoryUid) => {
    setSelectedCategory(categoryUid);
    setSelectedProduct(null); // Reset the selected product when category changes
  };

  const handleProductSelect = (productSku) => {
    setSelectedProduct(productSku);
  };

  return (
    <ApolloProvider client={client}>
      <ProductCategories onCategorySelect={handleCategorySelect} />
      {selectedCategory && (
        <ProductList
          categoryUid={selectedCategory}
          onProductSelect={handleProductSelect}
        />
      )}
      {selectedProduct && <ProductDetails productSku={selectedProduct} />}
    </ApolloProvider>
  );
}
