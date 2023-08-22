import DataProvider from './DataProvider';
import Categories from '@/components/Categories';
import Products from '@/components/Products';
import Modal from '@/components/base/Modal';
import Details from '@/components/Details';

export default function App() {
  return (
    <DataProvider className='container m-auto'>
      <Categories />
      <Products />
      <Modal>
        <Details />
      </Modal>
    </DataProvider>
  );
}
