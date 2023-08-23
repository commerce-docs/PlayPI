import Spinner from '@/components/base/Spinner';
import Images from '@/components/base/Images';
import Button from '@/components/base/Button';
import Description from '@/components/base/Description';
import Attributes from '@/components/base/Attributes';
import Price from '@/components/base/Price';
import Options from '@/components/base/Options';
import Breadcrumbs from '@/components/base/Breadcrumbs';
import { useProductsProvider } from '@/ProductsProvider';

export default function Details() {
  const {
    productDetails,
    isConfigurableProduct,
    hasCustomAttributes,
    options,
    updateOption,
    selectedOption,
    isLoading,
  } = useProductsProvider();

  if (isLoading) return <Spinner />;

  return (
    <div>
      {productDetails && (
        <div className='bg-white'>
          <div className='w-full pb-16 pt-6 md:pt-0 md:pb-6 sm:pb-24'>
            <div className='flex justify-start'>
              <Breadcrumbs product={productDetails} />
            </div>
            <div className='mx-auto mt-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
              <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
                <div className='lg:col-span-5 lg:col-start-8'>
                  <div className='flex justify-between'>
                    <h1 className='text-xl font-medium text-gray-900'>{productDetails.name}</h1>
                    <p className='text-xl font-medium text-gray-900'>
                      <Price productDetails={productDetails} />
                    </p>
                  </div>
                </div>
                <Images productDetails={productDetails} />
                <div className='mt-4 lg:col-span-5'>
                  <form>
                    {isConfigurableProduct && (
                      <Options
                        options={options}
                        selectedOption={selectedOption}
                        updateOption={updateOption}
                        productDetails={productDetails}
                      />
                    )}
                    <Button sku={productDetails.sku} label='Add to cart' />
                  </form>
                  <Description description={productDetails.description} />
                  {hasCustomAttributes && (
                    <Attributes
                      attributes={productDetails.custom_attributes}
                      productDetails={productDetails}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
