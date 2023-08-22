import useDataStore from '@/hooks/useDataStore';
import Spinner from '@/components/base/Spinner';
import Price from '@/components/base/Price';

const ProductList = ({ setModalToOpen }) => {
  const { dataStore, isLoading, selectedCategory, updateSelectedProduct } = useDataStore();

  if (isLoading) return <Spinner />;

  return (
    <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {dataStore.products.map((product) => (
          <ProductTile
            key={product.uid}
            product={product}
            onSelect={updateSelectedProduct}
            openModal={setModalToOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

function ProductTile({ product, onSelect, openModal }) {
  return (
    <button
      onClick={() => {
        onSelect(product.sku);
        openModal();
      }}
      className='group relative overflow-hidden rounded-lg border border-gray-...'
      aria-label={`Select ${product.name}`}
    >
      <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
        <img
          src={product.media_gallery?.[0]?.url}
          alt={`Image of ${product.name}`}
          className='h-full w-full object-cover object-center sm:h-full sm:w-full'
        />
      </div>
      <div className='flex flex-1 flex-col space-y-2 p-4'>
        <h3 className='text-sm font-medium text-gray-900'>{product.name}</h3>
        <div className='flex flex-1 flex-col justify-end'>
          <p className='text-sm italic text-gray-500'>{product.stock_status}</p>
          <p className='text-base font-medium text-gray-900'>
            <Price price={product.price_range} />
          </p>
        </div>
      </div>
    </button>
  );
}
