export default function Breadcrumbs({ product }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl px-4 sm:px-6 sm:pt-4 lg:px-8"
    >
      <ul role="list" className="flex items-center space-x-3 list-none ml-0">
        {product?.categories?.map((category) => (
          <li key={category.uid}>
            <div className="flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-900">
                {category.name}
              </span>
              <svg
                viewBox="0 0 6 20"
                aria-hidden="true"
                className="h-5 w-auto text-gray-300"
              >
                <path
                  d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </li>
        ))}
        <li className="text-sm">
          <span
            aria-current="page"
            className="font-medium text-gray-500 hover:text-gray-600"
          >
            {product?.name}
          </span>
        </li>
      </ul>
    </nav>
  );
}
