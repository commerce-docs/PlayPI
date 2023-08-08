import { useQuery } from '@apollo/client';
import { formatPrice } from '../utils';
import getListQuery from '../queries/listQuery';

const ProductList = ({ categoryUid, onProductSelect }) => {
  const LIST_QUERY = getListQuery(categoryUid);
  const { data } = useQuery(LIST_QUERY);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {data.products.items.map((product) => (
            <button
              key={product.uid}
              onClick={() => onProductSelect(product.sku)}
            >
              <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <img
                    src={product.media_gallery[0].url}
                    alt={product.name}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex flex-1 flex-col justify-end">
                    <p className="text-sm italic text-gray-500">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.stock_status}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      {formatPrice(
                        product.price_range.minimum_price.final_price.value,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
