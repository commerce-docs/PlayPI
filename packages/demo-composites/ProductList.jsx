/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { Price } from '../demo-components';
import { Spinner } from '../demo-components';
import { useDataProvider } from 'demo-apis';

export const ProductList = () => {
  const { products, isLoading, updateProduct } = useDataProvider();

  if (isLoading) return <Spinner />;

  return (
    <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8'>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products.map((product) => (
          <ProductTile
            key={product.uid}
            product={product}
            updateProduct={updateProduct}
          />
        ))}
      </div>
    </div>
  );
};

export function ProductTile({ product, updateProduct }) {
  return (
    <button
      onClick={() => {
        updateProduct(product.sku);
      }}
      className='border-gray-... group relative overflow-hidden rounded-lg border'
      aria-label={`Select ${product.name}`}>
      <div className='aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96'>
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
