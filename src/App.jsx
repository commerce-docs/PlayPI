import React, { useState, useEffect, useRef } from 'react';
import ProductCategories from '@/components/ProductCategories';
import ProductList from '@/components/ProductList';
import ProductDetails from '@/components/ProductDetails';
import Modal from 'react-modal';
import './index.css';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalChildLoaded, setModalChildLoaded] = useState(false);
  // const detailsRef = useRef(null);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalChildLoaded(false), setModalIsOpen(false);
  };

  const handleModalChildLoaded = () => {
    setModalChildLoaded(true);
  };

  const handleAfterOpenModal = () => {
    document.body.classList.add('modal-open');
  };

  const handleBeforeCloseModal = () => {
    document.body.classList.remove('modal-open');
  };

  return (
    <div className='container m-auto'>
      <ProductCategories />
      <ProductList setModalToOpen={handleOpenModal} />
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
        <ProductDetails onRequestClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
