import PropTypes from 'prop-types';
import Spinner from '@/components/base/Spinner';
import classNames from 'classnames';
import noImage from '@/assets/no-image.jpg';
import useDataStore from '@/hooks/useDataStore';

const ProductCategories = () => {
  const { dataStore, isLoading, updateSelectedCategory } = useDataStore();

  if (isLoading) return <Spinner />;

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
};

export default ProductCategories;

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
  return (
    <div className='hidden sm:block'>
      <nav className='flex justify-evenly border-b border-gray-200' aria-label='Categories'>
        {categories.map((category) => (
          <CategoryButton
            key={category.uid}
            category={category}
            isSelected={category.uid === selectedCategory}
            onCategorySelected={updateSelectedCategory}
          />
        ))}
      </nav>
    </div>
  );
}

function CategoryButton({ category, isSelected, updateSelectedCategory }) {
  const displayNameMap = {
    'Shop The Look': 'Featured',
    'New Products': 'New',
  };

  return (
    <button
      key={category.uid}
      onClick={() => updateSelectedCategory(category.uid)}
      className={classNames(
        isSelected
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
  );
}

DropdownCategories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  updateSelectedCategory: PropTypes.func.isRequired,
};

BlockCategories.propTypes = DropdownCategories.propTypes;

CategoryButton.propTypes = {
  category: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  updateSelectedCategory: PropTypes.func.isRequired,
};
