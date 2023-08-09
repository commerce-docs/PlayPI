import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';

export default function OptionColor({ option }) {
  return (
    <RadioGroup.Option
      key={option.label}
      value={option.swatch_data.value}
      style={{
        backgroundColor: option.swatch_data.value,
      }}
      className={({ active, checked }) =>
        classNames(
          active && checked ? 'ring ring-offset-1' : '',
          !active && checked ? 'ring-2' : '',
          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
        )
      }
    >
      <RadioGroup.Label as="span" className="sr-only">
        {option.label}
      </RadioGroup.Label>
      <span
        style={{
          backgroundColor: option.swatch_data.value,
        }}
        aria-hidden="true"
        className="h-8 w-8 rounded-full border border-black border-opacity-10"
      />
    </RadioGroup.Option>
  );
}
