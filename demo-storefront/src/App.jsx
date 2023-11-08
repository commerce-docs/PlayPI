/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/
import { DataProvider } from 'demo-apis';
import { ProductCategories } from 'demo-composites';
import { ProductList } from 'demo-composites';
import { ProductDetails } from 'demo-composites';
import { Modal } from 'demo-components';

export default function App() {
  return (
    <DataProvider>
      <ProductCategories />
      <ProductList />
      <Modal>
        <ProductDetails />
      </Modal>
    </DataProvider>
  );
}
