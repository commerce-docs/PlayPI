/* Copyright 2023 Adobe. All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of Adobe and its suppliers, if any. The intellectual and technical concepts contained herein are proprietary to Adobe and its suppliers and are protected by all applicable intellectual property laws, including trade secret and copyright laws. Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained from Adobe.
*/

import { useDataProvider } from 'adobe-apis';
import { Spinner } from 'base-components';
import { classNames } from 'base-components';
import noImage from './assets/no-image.jpg';

export const ProductCategories = () => {
  const { categories, selectedCategory, isLoading, updateCategory } =
    useDataProvider();

  if (isLoading) return <Spinner />;

  return (
    <div className='-mb-6 mt-6 px-4'>
      <DropdownCategories
        categories={categories}
        selectedCategory={selectedCategory}
        updateCategory={updateCategory}
      />
      <BlockCategories
        categories={categories}
        selectedCategory={selectedCategory}
        updateCategory={updateCategory}
      />
    </div>
  );

  function DropdownCategories({
    categories,
    selectedCategory,
    updateCategory,
  }) {
    return (
      <div className='-mb-6 sm:hidden'>
        <label htmlFor='categories' className='sr-only'>
          Select a product category
        </label>
        <select
          onChange={(e) => updateCategory(e.target.value)}
          id='categories'
          name='categories'
          className='mb-0 block w-full rounded-md border-gray-300 p-4 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
          value={selectedCategory}>
          {categories.map(({ name, uid }) => (
            <option key={uid} value={uid}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function BlockCategories({ categories, selectedCategory, updateCategory }) {
    const displayNameMap = {
      'Shop The Look': 'Featured',
      'New Products': 'New',
    };
    return (
      <div className='hidden sm:block'>
        <nav
          className='flex justify-evenly border-b border-gray-200'
          aria-label='Categories'>
          {categories.map((category) => (
            <button
              key={category.uid}
              onClick={() => updateCategory(category.uid)}
              className={classNames(
                selectedCategory === category.uid
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'mx-2 w-auto border-b-2 pb-2 text-center text-sm font-medium'
              )}>
              <div className='flex-col'>
                <img
                  className='mb-2 max-w-full rounded-md'
                  src={category.image || noImage}
                  alt={category.name}
                />
                <span>{displayNameMap[category.name] || category.name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    );
  }
};
