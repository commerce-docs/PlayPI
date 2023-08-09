export default function Attributes({ attributes }) {
  return (
    <div className="mt-5 border-t border-gray-200 pt-1">
      <div className="prose prose-sm mt-4 text-gray-500">
        <ul>
          {attributes.map((attribute) => (
            <li key={attribute.attribute_metadata.uid}>
              <span className="text-gray-900">
                {attribute.attribute_metadata.label}
                {': '}
              </span>
              {attribute.selected_attribute_options.attribute_option[0].label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
