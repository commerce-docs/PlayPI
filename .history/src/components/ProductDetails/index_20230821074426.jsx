import { useEffect, useState } from 'react';
import Spinner from '@/components/base/Spinner';
import Images from '@/components/base/Images';
import Button from '@/components/base/Button';
import Description from '@/components/base/Description';
import Attributes from '@/components/base/Attributes';
import Price from '@/components/base/Price';
import Options from '@/components/base/Options';
import Breadcrumbs from '@/components/base/Breadcrumbs';

import useDataStore from '@/hooks/useDataStore';

export default function ProductDetails() {
  const { dataStore, isLoading } = useDataStore();

  if (isLoading) return <Spinner />;

  const productDetails = dataStore.products;

  // let configurableOptions = [];
  // let customAttributes = [];
  // let isConfigurableProduct = false;
  // let hasCustomAttributes = false;

  // useEffect(() => {
  //   if (productDetails) {
  //     configurableOptions = productDetails.configurable_options;
  //     customAttributes = productDetails.custom_attributes;
  //     isConfigurableProduct = Boolean(configurableOptions?.length > 0);
  //     hasCustomAttributes = Boolean(customAttributes?.length > 0);
  //     console.log(productDetails.name);
  //   }
  // }, [productDetails]);

  return (
    <div>
      Won't work
      {/* <div className='bg-white'>
        <div className='pb-16 pt-6 sm:pb-24'>
          <div className='flex justify-start'>
            <Breadcrumbs product={productDetails} />
          </div>
          <div className='mx-auto mt-8 max-w-md px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
              <div className='lg:col-span-5 lg:col-start-8'>
                <div className='flex justify-between'>
                  <h1 className='text-xl font-medium text-gray-900'>{productDetails.name}</h1>
                  <p className='text-xl font-medium text-gray-900'>
                    <Price productDetails={productDetails} />
                  </p>
                </div>
              </div>
              <Images productDetails={productDetails} />
              <div className='mt-4 lg:col-span-5'>
                <form>
                  {isConfigurableProduct && (
                    <Options
                      configurableOptions={configurableOptions}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      productDetails={productDetails}
                    />
                  )}
                  <Button sku={productDetails.sku} label='Add to cart' />
                </form>
                <Description description={productDetails.description} />
                {hasCustomAttributes && (
                  <Attributes
                    attributes={productDetails.custom_attributes}
                    productDetails={productDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}