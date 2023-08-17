import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';

export default function OptionText({
  option,
  selectedOption,
  setSelectedOption,
  selectedProduct,
}) {
  return (
    <div className='mt-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-medium text-gray-900'>{option.label}</h2>
      </div>
      <RadioGroup
        value={selectedOption}
        onChange={() => setSelectedOption(selectedOption)}
        className='mt-2'
      >
        <RadioGroup.Label className='sr-only'>
          Choose a {option.label}
        </RadioGroup.Label>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
          {option.values.map((value) => (
            <RadioGroup.Option
              key={value.uid}
              value={value.swatch_data.value}
              className={({ active, checked }) =>
                classNames(
                  selectedProduct.stock_status === 'IN_STOCK'
                    ? 'cursor-pointer focus:outline-none'
                    : 'cursor-not-allowed opacity-25',
                  active ? 'ring-2 ring-blue-500 ring-offset-2' : '',
                  checked
                    ? 'border-transparent bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                )
              }
              disabled={selectedProduct.stock_status !== 'IN_STOCK'}
            >
              <RadioGroup.Label as='span'>{value.label}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
