/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

export function Attributes({ attributes, productDetails }) {
  if (!attributes) return null;

  // Create a SKU attribute with the required structure
  const skuAttribute = {
    attribute_metadata: {
      label: 'SKU',
      uid: productDetails.sku,
      __typename: 'ProductAttributeMetadata',
    },
    selected_attribute_options: {
      attribute_option: [
        {
          label: productDetails.sku,
          uid: productDetails.sku,
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
    <div className='mt-5 border-t border-gray-200 pt-1'>
      <div className='prose prose-sm mt-4 text-gray-600'>
        <ul>
          {updatedAttributes.map((attribute) => (
            <AttributeItem
              key={attribute.attribute_metadata.uid}
              attribute={attribute}
            />
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
      <span className='font-light text-gray-600'>
        {attribute.attribute_metadata.label}
        {': '}
      </span>
      <AttributeOptions
        key={attribute.attribute_metadata.uid}
        options={options}
      />
    </li>
  );
}

function AttributeOptions({ options }) {
  if (options?.length > 1) {
    return options.map((option, index) => (
      <span key={option.uid} className='font-normal text-gray-900'>
        {option.label}
        {index !== options.length - 1 && ', '}
      </span>
    ));
  }

  if (options?.length > 0) {
    return (
      <span className='font-normal text-gray-900'>{options[0].label}</span>
    );
  }

  return null;
}
