import Spinner from '@/components/base/Spinner';
import classNames from 'classnames';
import noImage from '@/assets/no-image.jpg';
import { useDataStore } from '@/DataProvider';

const Categories = () => {
  const { dataStore, isLoading, updateCategory } = useDataStore();

  if (isLoading) return <Spinner />;

  return (
    <div className='mt-6 -mb-6 px-4'>
      <DropdownCategories
        categories={dataStore.categories}
        selectedCategory={dataStore.selectedCategory}
        updateCategory={updateCategory}
      />
      <BlockCategories
        categories={dataStore.categories}
        selectedCategory={dataStore.selectedCategory}
        updateCategory={updateCategory}
      />
    </div>
  );

  function DropdownCategories({ categories, selectedCategory, updateCategory }) {
    return (
      <div className='sm:hidden -mb-6'>
        <label htmlFor='categories' className='sr-only'>
          Select a product category
        </label>
        <select
          onChange={(e) => updateCategory(e.target.value)}
          id='categories'
          name='categories'
          className='block w-full rounded-md border-gray-300 mb-0 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
          value={selectedCategory}
        >
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
        <nav className='flex justify-evenly border-b border-gray-200' aria-label='Categories'>
          {categories.map((category) => (
            <button
              key={category.uid}
              onClick={() => updateCategory(category.uid)}
              className={classNames(
                selectedCategory === category.uid
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'border-b-2 mx-2 pb-2 text-sm font-medium w-auto text-center',
              )}
            >
              <div className='flex-col'>
                <img
                  className='rounded-md max-w-full mb-2'
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

export default Categories;
