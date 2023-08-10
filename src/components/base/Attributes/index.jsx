export default function Attributes({ attributes, product }) {
  console.log('product:', product);
  console.log('attributes:', attributes);

  if (!attributes) return null;

  return (
    <div className="mt-5 border-t border-gray-200 pt-1">
      <div className="prose prose-sm mt-4 text-gray-600">
        <ul>
          {attributes.map((attribute) => (
            <AttributeItem key={attribute.attribute_metadata.uid} attribute={attribute} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function AttributeItem({ attribute }) {
  return (
    <li>
      <span className="text-gray-600 font-light">
        {attribute.attribute_metadata.label}
        {': '}
      </span>
      <AttributeOptions options={attribute.selected_attribute_options.attribute_option} />
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
