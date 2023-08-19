export default function Options({ options, selectedOption, setSelectedOption, productDetails }) {
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
              productDetails={productDetails}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
}

function OptionColor({ option, selectedOption, setSelectedOption }) {
  return (
    <div className='mt-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-medium text-gray-900'>{option.label}</h2>
      </div>
      <RadioGroup
        value={selectedOption}
        onChange={() => setSelectedOption(selectedOption)}
        className='mt-2'
      >
        <RadioGroup.Label className='sr-only'>Choose a {option.label}</RadioGroup.Label>
        <div className='flex items-center space-x-3'>
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
              <RadioGroup.Label as='span' className='sr-only' key={value.label}>
                {value.label}
              </RadioGroup.Label>
              <span
                aria-hidden='true'
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

function OptionText({ option, selectedOption, setSelectedOption, productDetails }) {
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
        <RadioGroup.Label className='sr-only'>Choose a {option.label}</RadioGroup.Label>
        <div className='grid grid-cols-3 gap-3 sm:grid-cols-6'>
          {option.values.map((value) => (
            <RadioGroup.Option
              key={value.uid}
              value={value.swatch_data.value}
              className={({ active, checked }) =>
                classNames(
                  productDetails.stock_status === 'IN_STOCK'
                    ? 'cursor-pointer focus:outline-none'
                    : 'cursor-not-allowed opacity-25',
                  active ? 'ring-2 ring-blue-500 ring-offset-2' : '',
                  checked
                    ? 'border-transparent bg-blue-600 text-white hover:bg-blue-700'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                )
              }
              disabled={productDetails.stock_status !== 'IN_STOCK'}
            >
              <RadioGroup.Label as='span'>{value.label}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
