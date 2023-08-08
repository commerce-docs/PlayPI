import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { classNames } from '../utils';
import getCategoriesQuery from '../queries/categoriesQuery';

const ProductCategories = ({ onCategorySelect }) => {
  const CATEGORIES_QUERY = getCategoriesQuery(2);
  const { data } = useQuery(CATEGORIES_QUERY);

  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('MTg=');

  useEffect(() => {
    if (data?.categories?.items) {
      const categories = data.categories.items;
      setCategories(categories);
    }
  }, [data]);

  if (!categories) {
    return <div>Loading...</div>;
  }

  const handleCategorySelect = (categoryUid) => {
    setSelectedCategory(categoryUid);
    onCategorySelect(categoryUid);
  };

  const setCategory = (category) => {
    const categoryUid = categories.find((c) => c.name === category).uid;
    handleCategorySelect(categoryUid);
  };

  return (
    <div className="p-6">
      <div className="sm:hidden">
        <label htmlFor="categories" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          id="categories"
          name="categories"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={
            categories.find((category) => selectedCategory === category.uid)
              .name
          }
        >
          {categories.map((category) => (
            <option key={category.uid}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Categories">
            {categories.map((category) => (
              <button
                key={category.uid}
                onClick={() => handleCategorySelect(category.uid)}
                className={classNames(
                  selectedCategory === category.uid
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                )}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
