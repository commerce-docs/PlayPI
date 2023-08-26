export default function Description({ description }) {
  return (
    <section
      className="w-full mt-6 text-gray-500"
      dangerouslySetInnerHTML={{
        __html: description.html,
      }}
    />
  );
}
