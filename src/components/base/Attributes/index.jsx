export default function Attributes({ attributes, product }) {
  console.log('product:', product);
  console.log('attributes:', attributes);

  if (!attributes) return null;

  // Create a SKU attribute with the required structure
  const skuAttribute = {
    attribute_metadata: {
      label: 'SKU',
      uid: product.sku,
      __typename: 'ProductAttributeMetadata',
    },
    selected_attribute_options: {
      attribute_option: [
        {
          label: product.sku,
          uid: product.sku,
          __typename: 'AttributeOption',
        },
      ],
      __typename: 'SelectedAttributeOption',
    },
    __typename: 'CustomAttribute',
  };

  // Adding the SKU attribute as the first object in the attributes array
  const updatedAttributes = [skuAttribute, ...attributes];

  return (
    <div className="mt-5 border-t border-gray-200 pt-1">
      <div className="prose prose-sm mt-4 text-gray-600">
        <ul>
          {updatedAttributes.map((attribute) => (
            <AttributeItem key={attribute.attribute_metadata.uid} attribute={attribute} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function AttributeItem({ attribute }) {
  // Do not return the attribute if any option has a null label
  const options = attribute.selected_attribute_options?.attribute_option;
  if (!options || options.some((option) => option.label === null)) {
    return null;
  }

  return (
    <li>
      <span className="text-gray-600 font-light">
        {attribute.attribute_metadata.label}
        {': '}
      </span>
      <AttributeOptions options={options} />
    </li>
  );
}

function AttributeOptions({ options }) {
  if (options?.length > 1) {
    return options.map((option, index) => (
      <span key={option.uid} className="text-gray-900 font-normal">
        {option.label}
        {index !== options.length - 1 && ', '}
      </span>
    ));
  }

  if (options?.length > 0) {
    return <span className="text-gray-900 font-normal">{options[0].label}</span>;
  }

  return null;
}
