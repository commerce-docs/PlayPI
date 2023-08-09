import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';

export default function OptionButton({ option, selectedProduct }) {
  return (
    <RadioGroup.Option
      key={option.label}
      value={option.swatch_data.value}
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
      <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
    </RadioGroup.Option>
  );
}
