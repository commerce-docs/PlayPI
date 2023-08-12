import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';

export default function OptionColor({ option, selectedOption, setSelectedOption }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">{option.label}</h2>
      </div>
      <RadioGroup value={selectedOption} onChange={setSelectedOption} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a {option.label}</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {option.values.map((value) => (
            <RadioGroup.Option
              key={value.uid}
              value={value.swatch_data.value}
              style={{
                backgroundColor: value.swatch_data.value,
              }}
              className={({ active, checked }) =>
                classNames(
                  value.selectedOption,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only" key={value.label}>
                {value.label}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                className={classNames(
                  value.swatch_data.value,
                  'h-8 w-8 rounded-full border border-black border-opacity-10',
                )}
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
