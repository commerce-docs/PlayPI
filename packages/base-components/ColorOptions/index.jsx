/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { RadioGroup } from '@headlessui/react';
import { classNames } from '../classNames';

export const ColorOptions = ({
  colorOptions,
  colorOptionsLabel,
  selectedColorOption,
  updateColorOption,
}) => {
  return (
    <RadioGroup
      value={selectedColorOption}
      onChange={updateColorOption}
      className={'mt-2'}>
      <RadioGroup.Label className='block text-sm font-medium leading-6 text-gray-900'>
        {colorOptionsLabel}
      </RadioGroup.Label>
      <div className='mt-2 flex items-center space-x-3'>
        {colorOptions.map((color) => (
          <RadioGroup.Option
            key={color.label}
            value={color}
            className={({ active, checked }) =>
              classNames(
                color.class,
                active && checked ? 'ring ring-offset-1' : '',
                !active && checked ? 'ring ring-offset-1' : '',
                `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`
              )
            }>
            <RadioGroup.Label as='span' className='sr-only'>
              {color.label}
            </RadioGroup.Label>
            <span
              aria-hidden='true'
              className={classNames(
                color.class,
                'h-8 w-8 rounded-full border border-black border-opacity-10'
              )}
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
