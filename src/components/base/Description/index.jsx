export default function Description({ description }) {
  return (
    <div className="mt-10">
      <div
        className="prose prose-sm mt-4 text-gray-500"
        dangerouslySetInnerHTML={{
          __html: description.html,
        }}
      />
    </div>
  );
}
