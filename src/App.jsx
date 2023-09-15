/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying it. */

import AppProvider from './AppProvider';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Modal from '@/components/base/Modal';
import Details from '@/components/Details';
import './index.css';

export default function () {
  return (
    <AppProvider>
      <Categories />
      <Products />
      <Modal>
        <Details />
      </Modal>
    </AppProvider>
  );
}
