export default function Description({ description }) {
  return (
    <section
      className='mt-6 w-full text-gray-500'
      dangerouslySetInnerHTML={{
        __html: description.html,
      }}
    />
  );
}
