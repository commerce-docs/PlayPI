/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { RadioGroup } from '@headlessui/react';
import classNames from '@/utils/classNames';

const SizeOptions = ({
  sizeOptions,
  sizeOptionsLabel,
  selectedSizeOption,
  updateSizeOption,
  productDetails,
}) => {
  return (
    <RadioGroup
      value={selectedSizeOption}
      onChange={updateSizeOption}
      className='mt-4'>
      <RadioGroup.Label className='block text-sm font-medium leading-6 text-gray-900'>
        {sizeOptionsLabel}
      </RadioGroup.Label>
      <div className='mt-2 grid grid-cols-4 gap-3 sm:grid-cols-4'>
        {sizeOptions.map((size) => (
          <RadioGroup.Option
            key={size.label}
            value={size}
            className={({ active, checked }) =>
              classNames(
                productDetails.stock_status === 'IN_STOCK'
                  ? 'cursor-pointer focus:outline-none'
                  : 'cursor-not-allowed opacity-25',
                active ? 'ring-2 ring-blue-600 ring-offset-2' : '',
                checked
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                'flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase sm:flex-1'
              )
            }
            disabled={productDetails.stock_status !== 'IN_STOCK'}>
            <RadioGroup.Label as='span'>{size.label}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default SizeOptions;
