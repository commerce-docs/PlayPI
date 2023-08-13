import { useState, useEffect, Fragment } from 'react';
import Spinner from '@/components/base/Spinner';
import classNames from 'classnames';

import { useQuery } from '@apollo/client';
import ProductCategoriesQuery from '@/queries/ProductCategoriesQuery';
import noImage from '@/assets/no-image.jpg';

const ProductCategories = ({ selectedCategory, onCategorySelect }) => {
  // Query for categories based on the store id
  const { data } = useQuery(ProductCategoriesQuery(2));
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data?.categories?.items) {
      setCategories(data.categories.items);
    }
  }, [data]);

  if (!categories.length) {
    return <Spinner />;
  }

  const setCategory = (categoryName) => {
    const categoryUid = categories.find(
      ({ name }) => name === categoryName,
    )?.uid;
    if (categoryUid) onCategorySelect(categoryUid);
  };

  const selectedCategoryName =
    categories.find(({ uid }) => uid === selectedCategory)?.name || '';

  return (
    <div className='mt-6 -mb-6'>
      <div className='sm:hidden -mb-6'>
        <label htmlFor='categories' className='sr-only'>
          Select a product category
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          id='categories'
          name='categories'
          className='block w-full rounded-md border-gray-300 mb-0 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
          value={selectedCategoryName}
        >
          {categories.map(({ name, uid }) => (
            <option key={uid}>{name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div>
          <nav
            className='flex justify-evenly border-b-2 border-gray-500'
            aria-label='Categories'
          >
            {categories.map((category) => (
              <button
                key={category.uid}
                onClick={() => onCategorySelect(category.uid)}
                className={classNames(
                  category.uid === selectedCategory
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'border-b-2 mx-2 pb-2 text-sm font-medium w-auto text-center',
                )}
              >
                {category.image ? (
                  <div className='flex-col'>
                    <img
                      className='rounded-md max-w-full mb-2'
                      src={category.image}
                      alt={category.name}
                    />
                    <span>{category.name}</span>
                  </div>
                ) : (
                  <div className='flex-col'>
                    <img
                      className='rounded-l max-w-full mb-2'
                      src={noImage}
                      alt={'No Image Available'}
                    />
                    <span>
                      {category.name === 'Shop The Look'
                        ? 'Featured'
                        : category.name === 'New Products'
                        ? 'New'
                        : category.name}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
