import OptionColor from '../OptionColor';
import OptionText from '../OptionText';

export default function Options({ options, selectedOption, setSelectedOption, selectedProduct }) {
  if (!options) return null;

  return (
    <>
      {options.map((option) => {
        if (option.values[0].swatch_data.__typename === 'ColorSwatchData') {
          return (
            <OptionColor
              key={option.uid}
              option={option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          );
        } else if (option.values[0].swatch_data.__typename === 'TextSwatchData') {
          return (
            <OptionText
              key={option.uid}
              option={option}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedProduct={selectedProduct}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
