import PropTypes from 'prop-types';
import Spinner from '@/components/base/Spinner';
import classNames from 'classnames';
import noImage from '@/assets/no-image.jpg';
import useDataStore from '@/hooks/useDataStore';

const ProductCategories = () => {
  const { dataStore, isLoading, updateSelectedCategory } = useDataStore();

  if (isLoading) return <Spinner />;

  console.log('dataStore.selectedCategory', dataStore.selectedCategory);

  return (
    <div className='mt-6 -mb-6 px-4'>
      <DropdownCategories
        categories={dataStore.categories}
        selectedCategory={dataStore.selectedCategory}
        updateSelectedCategory={updateSelectedCategory}
      />
      <BlockCategories
        categories={dataStore.categories}
        selectedCategory={dataStore.selectedCategory}
        updateSelectedCategory={updateSelectedCategory}
      />
    </div>
  );

  function DropdownCategories({ categories, selectedCategory, updateSelectedCategory }) {
    return (
      <div className='sm:hidden -mb-6'>
        <label htmlFor='categories' className='sr-only'>
          Select a product category
        </label>
        <select
          onChange={(e) => updateSelectedCategory(e.target.value)}
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

  function BlockCategories({ categories, selectedCategory, updateSelectedCategory }) {
    const displayNameMap = {
      'Shop The Look': 'Featured',
      'New Products': 'New',
    };
    return (
      <div className='hidden sm:block'>
        <nav className='flex justify-evenly border-b border-gray-200' aria-label='Categories'>
          {categories.map(({ uid, image, name }) => (
            <button
              key={uid}
              onClick={() => updateSelectedCategory(uid)}
              className={classNames(
                selectedCategory
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                'border-b-2 mx-2 pb-2 text-sm font-medium w-auto text-center',
              )}
            >
              <div className='flex-col'>
                <img className='rounded-md max-w-full mb-2' src={image || noImage} alt={name} />
                <span>{displayNameMap[name] || name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    );
  }
};

export default ProductCategories;
