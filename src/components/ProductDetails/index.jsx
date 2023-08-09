import { useState, useEffect } from 'react';
import Spinner from '../base/Spinner';
import Images from '../base/Images';
import Button from '../base/Button';
import Description from '../base/Description';
import Attributes from '../base/Attributes';
import Price from '../base/Price';
import Options from '../base/Options';

import { useQuery } from '@apollo/client';
import ProductDetailsQuery from '../../queries/ProductDetailsQuery';

export default function ProductDetails({ productSku }) {
  // Fetch the product details
  const { loading, error, data } = useQuery(ProductDetailsQuery(productSku));

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [configurableOptions, setConfigurableOptions] = useState(null);

  useEffect(() => {
    if (data) {
      const product = data.products?.items[0];
      setSelectedProduct(product);
      if (product.configurable_options) {
        setConfigurableOptions(product.configurable_options);
      }
    }
  }, [data]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  if (!selectedProduct) return <Spinner />;

  const isConfigurableProduct = Boolean(selectedProduct.configurable_options);
  const hasCustomAttributes = Boolean(selectedProduct.custom_attributes);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-md px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">{selectedProduct.name}</h1>
                <p className="text-xl font-medium text-gray-900">
                  <Price product={selectedProduct} />
                </p>
              </div>
            </div>
            <Images selectedProduct={selectedProduct} />
            <div className="mt-8 lg:col-span-5">
              <form>
                {isConfigurableProduct && (
                  <Options
                    options={configurableOptions}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    selectedProduct={selectedProduct}
                  />
                )}
                <Button sku={selectedProduct.sku} label="Add to cart" />
              </form>
              <Description description={selectedProduct.description} />
              {hasCustomAttributes && <Attributes attributes={selectedProduct.custom_attributes} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
