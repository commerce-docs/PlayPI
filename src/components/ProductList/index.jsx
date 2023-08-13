import Spinner from '@/components/base/Spinner';
import Price from '@/components/base/Price';

import { useQuery } from '@apollo/client';
import ProductListQuery from '@/queries/ProductListQuery';

const ProductList = ({ selectedCategory, onProductSelect }) => {
  // Fetch the products for the selected category
  const { data } = useQuery(ProductListQuery(selectedCategory));
  const products = data?.products?.items || [];

  if (!products.length) {
    return <Spinner />;
  }

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map(
            ({ uid, sku, name, stock_status, media_gallery, price_range }) => (
              <button
                key={uid}
                onClick={() => onProductSelect(sku)}
                className='group relative overflow-hidden rounded-lg border border-gray-200 bg-white'
              >
                <div className='aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96'>
                  <img
                    src={media_gallery[0].url}
                    alt={name}
                    className='h-full w-full object-cover object-center sm:h-full sm:w-full'
                  />
                </div>
                <div className='flex flex-1 flex-col space-y-2 p-4'>
                  <h3 className='text-sm font-medium text-gray-900'>{name}</h3>
                  <div className='flex flex-1 flex-col justify-end'>
                    <p className='text-sm italic text-gray-500'>
                      {stock_status}
                    </p>
                    <p className='text-base font-medium text-gray-900'>
                      <Price price={price_range} />
                    </p>
                  </div>
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
