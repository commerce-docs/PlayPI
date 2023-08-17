import { useState, useEffect } from 'react';
import Spinner from '@/components/base/Spinner';
import Images from '@/components/base/Images';
import Button from '@/components/base/Button';
import Description from '@/components/base/Description';
import Attributes from '@/components/base/Attributes';
import Price from '@/components/base/Price';
import Options from '@/components/base/Options';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import { XMarkIcon } from '@heroicons/react/24/outline';

import useDataStore from '@/hooks/useDataStore';

export default function ProductDetails({ onRequestClose }) {
  const {
    dataStore: { products, selectedProductSku },
    isLoading,
  } = useDataStore();

  if (isLoading) return <Spinner />;

  const selectedProduct = products.find((product) => product.sku === selectedProductSku);

  const [configurableOptions, setConfigurableOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const isConfigurableProduct = Boolean(selectedProduct?.configurable_options);
  const hasCustomAttributes = Boolean(selectedProduct?.custom_attributes?.length);

  if (selectedProduct && selectedProduct.configurable_options) {
    setConfigurableOptions(selectedProduct.configurable_options);
  }

  return (
    <div>
      <div className='bg-white'>
        <div className='pb-16 pt-6 sm:pb-24'>
          <div className='flex justify-start'>
            <Breadcrumbs product={selectedProduct} />
            <button
              type='button'
              className='absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8'
              aria-label='Close panel'
              onClick={() => onRequestClose()}
            >
              <span className='sr-only'>Close</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mx-auto mt-8 max-w-md px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
              <div className='lg:col-span-5 lg:col-start-8'>
                <div className='flex justify-between'>
                  <h1 className='text-xl font-medium text-gray-900'>{selectedProduct.name}</h1>
                  <p className='text-xl font-medium text-gray-900'>
                    <Price product={selectedProduct} />
                  </p>
                </div>
              </div>
              <Images selectedProduct={selectedProduct} />
              <div className='mt-4 lg:col-span-5'>
                <form>
                  {isConfigurableProduct && (
                    <Options
                      options={configurableOptions}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      selectedProduct={selectedProduct}
                    />
                  )}
                  <Button sku={selectedProduct.sku} label='Add to cart' />
                </form>
                <Description description={selectedProduct.description} />
                {hasCustomAttributes && (
                  <Attributes
                    attributes={selectedProduct.custom_attributes}
                    product={selectedProduct}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
