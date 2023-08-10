import ColorPicker from '../ColorPicker';
import OptionPicker from '../OptionPicker';

export default function Options({ options, selectedOption, setSelectedOption, selectedProduct }) {
  // console.log('options:', options);
  // console.log('selectedProduct SKU:', selectedProduct.sku);

  function getSwatchData(options) {
    console.log('typename', options[0].values[0].swatch_data.__typename);
    // return swatch_data;
  }

  options.forEach((option) => {
    if (option.values[0].swatch_data.__typename === 'ColorSwatchData') {
      console.log('ColorSwatchData');
    } else if (option.values[0].swatch_data.__typename === 'TextSwatchData') {
      console.log('TextSwatchData');
    } else {
      console.log('no swatch data');
    }
  });

  getSwatchData(options);

  return;

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
