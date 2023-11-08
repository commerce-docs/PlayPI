# Storefront demo using Adobe Commerce GraphQL APIs

With just three product-based GraphQL queries, this simple React app helps highlight some of the Products API from Adobe's extensive Commerce API. The three queries fetch different types of product data to drive a simple products page that might exist in a larger storefront. Nearly 100% of the app's content is returned from queries to our reference Venia store: [venia.magento.com](https://venia.magento.com).

This app is not meant to be a beacon of frontend best practices. [Other teams at Adobe are actively working on that](#the-future-of-adobe-commerce-frontend-components). It's only meant to demonstrate just how much data you can retrieve and present with the Commerce API.

## Project structure

The project is organized into one storefront app and three packages:

- `storefront` — The example React app that imports the other packages.
- `packages/adobe-apis` — Provides the GraphQL queries used to fetch the product data.
- `packages/base-components` — Provides the basic React components to build the main storefront components.
- `packages/storefront-components` — Provides the main storefront components that use the GraphQL queries and the React components to display product data.


## `adobe-apis`

This package contains the GraphQL queries and fetch functions for Venia's Commerce backend:

- `fetchCategories.js` — Uses the `CATEGORIES_QUERY` to fetch the product categories from the Venia store.
- `fetchProducts.js` — Uses the `PRODUCTS_QUERY` to fetch the selected category's products (currently limited to 12 for better performance).
- `fetchDetails.js` — Uses the `DETAILS_QUERY` to fetch the selected product's details.

To keep the example as simple and trasparent as possible, the fetch functions use JavaScript's Fetch API and a GraphQL endpoint for Venia sample data.


## `base-components`

This package provides all the common components like buttons, breadcrumbs, and modals. These components are the building blocks for larger composite storefront components —  like product category menus, product display lists, and product detail pages.

Tailwindcss is used for all common components styling.

## `storefront-components`

This package provides three composite components that use and display product data retrieved from the three corresponding GraphQL queries from the `adobe-apis` package. The composite storefront components are:

- `ProductCategories.jsx` — Uses the data retrieved from the `CATEGORIES_QUERY`.
- `ProductList.jsx` — Uses the data retrieved from the `PRODUCTS_QUERY`.
- `ProductDetails.jsx` — Uses the data retrieved from the `DETAILS_QUERY`.

Tailwindcss is used for all composite components styling.

## Run the app

1. Clone the repo: `git clone git@github.com:commerce-docs/playpi.git`
2. Change directories: `cd playpi`
3. Run `pnpm install` to install all dependencies.
4. Run `pnpm start:dev` to run the storefront locally.

## Things to finish

- Fix UI jumpiness when selecting categories and products. Recently introduced.

- Use [Stackblitz](https://stackblitz.com/) or [Codesandbox](https://codesandbox.io/) to embed the project into a docs site that provides an interactive experience for learning about the Adobe Commerce API.
  
- Create a "data-only" view. No product images or text will be displayed. Only the GraphQL fields and the component name that uses them will be rendered on the screen—in boxes at the same locations in the UI. The purpose is to demonstrate how data from the Commerce GraphQL API feeds a frontend — any frontend!

## The future of Adobe Commerce frontend components

If nothing else, this project should show just how hard it is to create good frontend e-commerce components and how many are involved in even the simplest of single-page apps.

Here at Adobe, we are hard at work, actively solving the complexity of e-commerce frontends. We currently have several teams working on the next generation of frontend components along with the framework and SDK tools to build them... Stay tuned!
