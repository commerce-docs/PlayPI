import { useState } from 'react';
import ProductCategories from '@/components/ProductCategories';
import ProductList from '@/components/ProductList';
import ProductDetails from '@/components/ProductDetails';
// import Modal from '@/components/base/Modal';
import Modal from 'react-modal';
import './app.css';

import { ApolloProvider } from '@apollo/client';
import DataFetcher from '@/queries/DataFetcher';

Modal.setAppElement(document.getElementById('root'));

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    marginRight: '5%',
    marginLeft: '5%',
    top: '5%',
    left: 'auto',
    right: 'auto',
    bottom: '5%',
    overflowY: 'auto',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
};

export default function ProductExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('MTg=');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleCategorySelect = (categoryUid) => {
    setSelectedCategory(categoryUid);
    setSelectedProduct(null); // Reset the selected product when category changes
  };

  const handleProductSelect = (productSku) => {
    setSelectedProduct(productSku);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    document.body.classList.remove('modal-open');
    setIsOpen(false);
  };

  const handleAfterOpenModal = () => {
    document.body.classList.add('modal-open');
  };

  const handleBeforeCloseModal = () => {
    document.body.classList.remove('modal-open');
    handleCloseModal();
  };

  return (
    <ApolloProvider client={DataFetcher}>
      <div className='container m-auto'>
        <ProductCategories
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <ProductList
          selectedCategory={selectedCategory}
          onProductSelect={handleProductSelect}
        />
        <Modal
          isOpen={modalIsOpen}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={handleCloseModal}
          onAfterOpen={handleAfterOpenModal}
          onBeforeClose={handleBeforeCloseModal}
          style={modalStyles}
        >
          <ProductDetails
            productSku={selectedProduct}
            onRequestClose={handleBeforeCloseModal}
          />
        </Modal>
      </div>
    </ApolloProvider>
  );
}
