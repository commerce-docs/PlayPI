import ProductTile from '@/components/ProductTile';
import useDataStore from '@/hooks/useDataStore';
import Spinner from '@/components/base/Spinner';

export default function ProductList() {
  const { dataStore, isLoading, updateSelectedProductSku } = useDataStore();

  if (isLoading) return <Spinner />;

  const products = dataStore?.products || [];

  return (
    <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products.map((product) => (
          <ProductTile
            key={product.uid}
            product={product}
            onSelect={updateSelectedProductSku}
          />
        ))}
      </div>
    </div>
  );
}
