import { useEffect } from 'react';
import ProductCategories from '@/components/ProductCategories';
import ProductList from '@/components/ProductList';
import ProductDetails from '@/components/ProductDetails';
import Modal from 'react-modal';
import './index.css';

import { ApolloProvider } from '@apollo/client';
import GraphqlClient from './queries/GraphqlClient';
import useDataStore from '@/hooks/useDataStore';

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

export default function App() {
  const {
    dataStore: { selectedProductSku, modalIsOpen, productDetailsLoaded },
    handleCloseModal,
    handleAfterOpenModal,
    handleBeforeCloseModal,
  } = useDataStore();

  useEffect(() => {
    if (productDetailsLoaded) {
      setModalIsOpen(true);
    }
  }, [productDetailsLoaded]);

  return (
    <ApolloProvider client={GraphqlClient}>
      <div className='container m-auto'>
        <ProductCategories />
        <ProductList />
        <div style={{ display: modalIsOpen ? 'none' : 'block' }}>
          <ProductDetails
            productSku={selectedProductSku}
            onRequestClose={handleCloseModal}
            productDetailsLoaded={productDetailsLoaded}
            onProductDetailsLoaded={() => setProductDetailsLoaded(true)}
          />
        </div>
        <Modal
          closeTimeoutMS={300}
          openTimeoutMS={1000}
          isOpen={modalIsOpen && productDetailsLoaded}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={handleCloseModal}
          onAfterOpen={handleAfterOpenModal}
          onBeforeClose={handleBeforeCloseModal}
          style={modalStyles}
        >
          {productDetailsLoaded && (
            <ProductDetails
              productSku={selectedProductSku}
              onRequestClose={handleCloseModal}
              // productDetailsLoaded={productDetailsLoaded}
              onProductDetailsLoaded={() => setProductDetailsLoaded(true)}
            />
          )}
        </Modal>
      </div>
    </ApolloProvider>
  );
}
