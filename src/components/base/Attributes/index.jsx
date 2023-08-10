export default function Attributes({ attributes, product }) {
  console.log('product:', product);
  console.log('attributes:', attributes);
  if (!attributes) return null;
  return (
    <div className="mt-5 border-t border-gray-200 pt-1">
      <div className="prose prose-sm mt-4 text-gray-600">
        <ul>
          {attributes.map((attribute) => (
            <li key={attribute.attribute_metadata.uid}>
              <span className="text-gray-600 font-light">
                {attribute.attribute_metadata.label}
                {': '}
              </span>
              {attribute.selected_attribute_options.attribute_option?.length > 1
                ? attribute.selected_attribute_options.attribute_option.map((option, index) => (
                    <span key={option.uid} className="text-gray-900 font-normal">
                      {option.label}
                      {index !== attribute.selected_attribute_options.attribute_option.length - 1 && ', '}
                    </span>
                  ))
                : attribute.selected_attribute_options.attribute_option?.length > 0 && (
                    <span className="text-gray-900 font-normal">
                      {attribute.selected_attribute_options.attribute_option[0].label}
                    </span>
                  )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
