import { useState, useEffect } from 'react';
import Spinner from '../base/Spinner';
import classNames from 'classnames';

// Commerce query
import { useQuery } from '@apollo/client';
import ProductCategoriesQuery from '../../queries/ProductCatagoriesQuery';

const ProductCategories = ({ onCategorySelect }) => {
  const { data } = useQuery(ProductCategoriesQuery(2));

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('MTg=');

  useEffect(() => {
    if (data?.categories?.items) {
      setCategories(data.categories.items);
    }
  }, [data]);

  if (!categories.length) {
    return <Spinner />;
  }

  const handleCategorySelect = (categoryUid) => {
    setSelectedCategory(categoryUid);
    onCategorySelect(categoryUid);
  };

  const setCategory = (categoryName) => {
    const categoryUid = categories.find(({ name }) => name === categoryName)?.uid;
    if (categoryUid) handleCategorySelect(categoryUid);
  };

  const selectedCategoryName = categories.find(({ uid }) => uid === selectedCategory)?.name || '';

  return (
    <div className="m-6">
      <div className="sm:hidden -mb-6">
        <label htmlFor="categories" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          id="categories"
          name="categories"
          className="block w-full rounded-md border-gray-300 mb-0 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedCategoryName}
        >
          {categories.map(({ name, uid }) => (
            <option key={uid}>{name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Categories">
            {categories.map(({ name, uid }) => (
              <button
                key={uid}
                onClick={() => handleCategorySelect(uid)}
                className={classNames(
                  uid === selectedCategory
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                )}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
