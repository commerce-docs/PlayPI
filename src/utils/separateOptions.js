export default function separateOptions(options) {
  const colorOptions = [];
  const sizeOptions = [];
  let colorOptionsLabel = "Colors";
  let sizeOptionsLabel = "Sizes";

  if (!options)
    return { colorOptions, sizeOptions, colorOptionsLabel, sizeOptionsLabel };

  options.forEach((option) => {
    option.values.forEach((value) => {
      if (value.swatch_data.__typename === "ColorSwatchData") {
        value.class = `bg-${value.label.toLowerCase()}`;
        colorOptions.push(value);
        colorOptionsLabel = option.label;
      }
      if (value.swatch_data.__typename === "TextSwatchData") {
        sizeOptions.push(value);
        sizeOptionsLabel = option.label;
      }
    });
  });

  // Sort the sizeOptions array in descending alphabetical order
  sizeOptions.sort((a, b) => b.label.localeCompare(a.label));

  return { colorOptions, sizeOptions, colorOptionsLabel, sizeOptionsLabel };
}
