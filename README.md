# Commerce API Explorer

With just three GraphQL queries, this simple React app highlights only a small part of Adobe's extensive Commerce API. The three queries focus on fetching product data to drive a simple products page from a larger storefront. The app fetches all its content from our example Venia store: [venia.magento.com](https://venia.magento.com).

This app is built as a just a simple example that shows just a bit of the data you can retrieve from the Commerce API and how you can put it to use with a variety of frontends.

## Project structure

The project contains two main directories:

- `src/queries` — for GraphQL queries and data fetching
- `src/components` — for displaying the data

## Project queries

The `queries` directory contains the GraphQL queries to Venia's Commerce backend:

- `ProductCategoriesQuery.js` — Defines the query for fetching the product categories from the Venia store.
- `ProductListQuery.js` — Defines the query for fetching the products from the selected category (limited to 12 for simplicity).
- `ProductDetailsQuery.js` — Defines the query for fetching the details from the selected product.

The `DataFetcher.js` uses the `ApolloClient` to fetch data from the Commerce GraphQL API using Venia's endpoint.

## Project components

For simplicity, each query has a corresponding component to display the data returned:

- `ProductCategories.jsx`
- `ProductList.jsx` 
- `ProductDetails.jsx`

The `base` directory contains a variety of other components used within the three main components.

Tailwindcss is used for all component styling.

## Usage

1. Clone the repo: `git clone git@github.com:commerce-docs/playpi.git`
2. Change directories: `cd playpi.git`
3. Run `yarn` to install dependencies.
4. Run `yarn start:server` to start the project's proxy server so you can access Venia's GraphQL endpoint.
5. Open another terminal (to keep the proxy-server running)
6. Run `yarn dev` to launch the product page example.

## The future of Commerce components

The components in this project are not meant to be beacons of best-practices. Frontends are hard. And commerce frontends are even harder.

So what should you do? Let me introduce the future of storefront components: Adobe Commerce Dropins and the Elsie SDK needed to build them... Stay tuned!
