import classNames from 'classnames';

export default function Images({ selectedProduct }) {
  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Product images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
        {selectedProduct.media_gallery.map((image) => (
          <img
            key={image.position}
            src={image.url}
            alt={image.label}
            className={classNames(
              image.label === 'Main' ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
              'rounded-lg',
            )}
          />
        ))}
      </div>
    </div>
  );
}
