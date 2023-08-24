import ProductsProvider from './ProductsProvider';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Modal from '@/components/base/Modal';
import Details from '@/components/Details';
import './index.css';

export default function App() {
  return (
    <ProductsProvider>
      <Categories />
      <Products />
      <Modal>
        <Details />
      </Modal>
    </ProductsProvider>
  );
}
