import ColorPicker from '../ColorPicker';
import OptionPicker from '../OptionPicker';

export default function Options({ options, selectedOption, setSelectedOption, selectedProduct }) {
  function getSwatchData(options) {
    const {swatch_data} = options[0].values[0];
    return swatch_data;
  }

  const {__typename} = getSwatchData(options);

  return (
    <div className="mt-4">
      {options.map((option) => {
        return __typename === 'ColorSwatchData' ? (
          <ColorPicker
            key={option.uid}
            option={option}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        ) : __typename === 'TextSwatchData' ? (
          <OptionPicker
            option={option}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedProduct={selectedProduct}
          />
        ) : null;
      })}
    </div>
  );
}
