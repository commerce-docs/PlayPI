import React, { useState } from 'react';
import ProductCategories from '@/components/ProductCategories';
import ProductList from '@/components/ProductList';
import ProductDetails from '@/components/ProductDetails';
import Modal from 'react-modal';
import useDataStore from '@/hooks/useDataStore';
import Spinner from '@/components/base/Spinner';

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
Modal.setAppElement(document.getElementById('root'));

export default function App() {
  const { dataStore, selectedCategory, isLoading } = useDataStore();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildLoaded, setModalChildLoaded] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <div className='container m-auto'>
      <ProductCategories />
      {selectedCategory && <ProductList setModalToOpen={handleOpenModal} />}
      {/* <div style={{ display: modalIsOpen ? 'none' : 'block' }}>
        <ProductDetails onLoaded={handleModalChildLoaded} onRequestClose={handleCloseModal} />
      </div> */}
      <Modal
        closeTimeoutMS={300}
        openTimeoutMS={1000}
        isOpen={modalIsOpen}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={handleCloseModal}
        onAfterOpen={handleAfterOpenModal}
        onBeforeClose={handleBeforeCloseModal}
        style={modalStyles}
      >
        <ProductDetails />
      </Modal>
    </div>
  );

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalChildLoaded(false), setModalIsOpen(false);
  }

  function handleModalChildLoaded() {
    setModalChildLoaded(true);
  }

  function handleAfterOpenModal() {
    document.body.classList.add('modal-open');
  }
  function handleBeforeCloseModal() {
    document.body.classList.remove('modal-open');
  }
}
