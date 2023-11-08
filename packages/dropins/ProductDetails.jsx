/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { useDataProvider } from 'api';
import { Spinner } from 'components';
import { Images } from 'components';
import { Button } from 'components';
import { Description } from 'components';
import { Attributes } from 'components';
import { Price } from 'components';
import { ColorOptions } from 'components';
import { SizeOptions } from 'components';
import { Breadcrumbs } from 'components';

export function ProductDetails() {
  const {
    productDetails,
    colorOptions,
    sizeOptions,
    selectedColorOption,
    selectedSizeOption,
    colorOptionsLabel,
    sizeOptionsLabel,
    updateSizeOption,
    updateColorOption,
    selectedColor,
    selectedSize,
    hasCustomAttributes,
    isLoading,
  } = useDataProvider();

  if (isLoading) return <Spinner />;

  console.log('🚀 colorOptions:', colorOptions);
  console.log('🚀 sizeOptions:', sizeOptions);

  return (
    <div>
      {productDetails && (
        <div className='bg-white'>
          <div className='w-full px-8 pb-12 pt-8 sm:px-0 sm:pb-12 sm:pt-4 md:pb-6 md:pt-0'>
            <div className='flex justify-start'>
              <Breadcrumbs product={productDetails} />
            </div>
            <div className='mx-auto mt-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
              <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
                <div className='lg:col-span-6 lg:col-start-7'>
                  <div className='flex w-full justify-between'>
                    <h1 className='text-xl font-medium text-gray-900'>
                      {productDetails.name}
                    </h1>
                    <div className='text-xl font-medium text-gray-900'>
                      <Price productDetails={productDetails} />
                    </div>
                  </div>
                </div>
                <Images productDetails={productDetails} />
                <div className='col-span-6 mt-4 sm:col-span-6 lg:col-span-6'>
                  <form>
                    {colorOptions?.length > 0 && (
                      <ColorOptions
                        colorOptions={colorOptions}
                        colorOptionsLabel={colorOptionsLabel}
                        selectedColorOption={selectedColorOption}
                        updateColorOption={updateColorOption}
                      />
                    )}
                    {sizeOptions?.length > 0 && (
                      <SizeOptions
                        sizeOptions={sizeOptions}
                        sizeOptionsLabel={sizeOptionsLabel}
                        selectedSizeOption={selectedSizeOption}
                        updateSizeOption={updateSizeOption}
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
        </div>
      )}
    </div>
  );
}
