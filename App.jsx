import { useState } from 'react';
import ProductCategories from './src/components/ProductCategories';
import ProductList from './src/components/ProductList';
import ProductDetails from './src/components/ProductDetails';
import Modal from './src/components/base/Modal';
import './app.css';

import { ApolloProvider } from '@apollo/client';
import CommerceEndpoint from './src/queries/CommerceEndpoint';

export default function ProductExplorer() {
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
    <ApolloProvider client={CommerceEndpoint}>
      <ProductCategories onCategorySelect={handleCategorySelect} />
      {selectedCategory && <ProductList categoryUid={selectedCategory} onProductSelect={handleProductSelect} />}
      {selectedProduct && (
        // <Modal>
        <ProductDetails productSku={selectedProduct} />
        // </Modal>
      )}
    </ApolloProvider>
  );
}
