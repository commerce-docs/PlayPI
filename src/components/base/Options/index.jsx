import { RadioGroup } from '@headlessui/react';
import ButtonOption from '../OptionButton';
import ColorOption from '../OptionColor';

export default function Options({ options, selectedOption, setSelectedOption, selectedProduct }) {
  if (!Array.isArray(options.values)) {
    return null;
  }
  console.log('options.values:', options.values);
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">{options.label}</h2>
      </div>
      <RadioGroup value={selectedOption} onChange={setSelectedOption} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a {options.label}</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {options.values.map((option) => {
            if (option.swatch_data.value.contains('#')) {
              <ColorOption option={option} />;
            } else {
              <ButtonOption option={option} selectedProduct={selectedProduct} />;
            }
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
