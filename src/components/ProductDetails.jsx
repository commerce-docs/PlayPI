/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { RadioGroup } from '@headlessui/react';
import { formatPrice, classNames } from '../utils';
import getDetailsQuery from '../queries/detailsQuery';

const ProductDetails = ({ productSku }) => {
  const DETAILS_QUERY = getDetailsQuery(productSku);
  const { data } = useQuery(DETAILS_QUERY);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (data) {
      const product = data.products.items[0];
      const colorOption = product.configurable_options[0];
      const sizeOption = product.configurable_options[1];
      setSelectedProduct(product);
      setSelectedColor(colorOption.values[0].swatch_data.value);
      setSelectedSize(sizeOption.values[0].swatch_data.value);
    }
  }, [data]);

  if (!data || !selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {selectedProduct.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  {formatPrice(
                    selectedProduct.price_range.minimum_price.final_price.value,
                  )}
                </p>
              </div>
            </div>
            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {selectedProduct.media_gallery.map((image) => (
                  <img
                    key={image.position}
                    src={image.url}
                    alt={image.label}
                    className={classNames(
                      image.label === 'Main'
                        ? 'lg:col-span-2 lg:row-span-2'
                        : 'hidden lg:block',
                      'rounded-lg',
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Colors */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">
                    {selectedProduct.configurable_options[0].label}
                  </h2>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {selectedProduct.configurable_options[0].values.map(
                        (color) => (
                          <RadioGroup.Option
                            key={color.label}
                            value={color.swatch_data.value}
                            style={{
                              backgroundColor: color.swatch_data.value,
                            }}
                            className={({ active, checked }) =>
                              classNames(
                                active && checked ? 'ring ring-offset-1' : '',
                                !active && checked ? 'ring-2' : '',
                                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none',
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.label}
                            </RadioGroup.Label>
                            <span
                              style={{
                                backgroundColor: color.swatch_data.value,
                              }}
                              aria-hidden="true"
                              className="h-8 w-8 rounded-full border border-black border-opacity-10"
                            />
                          </RadioGroup.Option>
                        ),
                      )}
                    </div>
                  </RadioGroup>
                </div>

                {/* Sizes */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">
                      {selectedProduct.configurable_options[1].label}
                    </h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See sizing chart
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {selectedProduct.configurable_options[1].values.map(
                        (size) => (
                          <RadioGroup.Option
                            key={size.label}
                            value={size.swatch_data.value}
                            className={({ active, checked }) =>
                              classNames(
                                data.products.items[0].stock_status ===
                                  'IN_STOCK'
                                  ? 'cursor-pointer focus:outline-none'
                                  : 'cursor-not-allowed opacity-25',
                                active
                                  ? 'ring-2 ring-indigo-500 ring-offset-2'
                                  : '',
                                checked
                                  ? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
                                  : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
                              )
                            }
                            disabled={
                              data.products.items[0].stock_status !== 'IN_STOCK'
                            }
                          >
                            <RadioGroup.Label as="span">
                              {size.label}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ),
                      )}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: selectedProduct.description.html,
                  }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul>
                    {selectedProduct.custom_attributes.map((item, index) => (
                      <li key={index}>
                        <span className="text-gray-900">
                          {item.attribute_metadata.label}
                          {': '}
                        </span>
                        {
                          item.selected_attribute_options.attribute_option[0]
                            .label
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
