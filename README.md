# Commerce Products API Explorer

With just three product-based GraphQL queries, this simple React app helps highlight some of the Products API from Adobe's extensive Commerce API. The three queries fetch different types of product data to drive a simple products page that might exist in a larger storefront. Nearly 100% of the app's content is returned from queries to our reference Venia store: [venia.magento.com](https://venia.magento.com).

This app is not meant to be a beacon of frontend best practices. [Other teams at Adobe are actively working on that](#the-future-of-adobe-commerce-frontend-components). It's only meant to demonstrate just how much data you can retrieve and present with the Commerce API.

## Project structure

The project contains two main directories:

- `src/api` — for GraphQL queries, client, and endpoint
- `src/components` — for displaying the data

## Project API

The `api` directory contains the GraphQL queries to Venia's Commerce backend:

- `fetchCategories.js` — Defines the CATEGORIES query for fetching the product categories from the Venia store.
- `fetchProducts.js` — Defines the PRODUCTS query for fetching the selected category's products (limited to 12 for simplicity).
- `fetchDetails.js` — Defines the DETAILS query for fetching the selected product's details.

To keep things simple, the Commerce Product APIs accessed in this app use JavaScript's Fetch API and Venia's GraphQL endpoint.
But of course you can use any GraphQL library you want.

## Project components

For the sake of simplicity, each query has a corresponding component to display the data returned:

- `ProductCategories.jsx`
- `ProductList.jsx`
- `ProductDetails.jsx`

The `base` directory contains a variety of other components used as children within the three main components.

Tailwindcss is used for all component styling.

## Run the app

1. Clone the repo: `git clone git@github.com:commerce-docs/playpi.git`
2. Change directories: `cd playpi`
3. Run `yarn` to install dependencies.
4. Run `yarn start:proxy` to start the project's proxy server so you can access Venia's GraphQL endpoint.
5. Open another shell (to keep the proxy-server running)
6. Run `yarn dev` to launch the product page example.

## Things to finish

- **Done**. ~~Fix color and size configurable options.~~
- **Done**. ~~Display `ProductDetails` in a modal. Currently, the product details appears at the bottom of the page.~~
- _In-Progress_. Use [Stackblitz](https://stackblitz.com/) or [Codesandbox](https://codesandbox.io/) to sandbox the project.
- Create a "data-only" view. No product images or text will be displayed. Only the GraphQL fields and the component name that uses them will be rendered on the screen—in boxes at the same locations in the UI. The purpose is to demonstrate how data from the Commerce GraphQL API feeds a frontend — any frontend!

## The future of Adobe Commerce frontend components

If nothing else, this project should show just how hard it is to create good frontend e-commerce components and how many are involved in even the simplest of single-page apps.

Here at Adobe, we are hard at work, actively solving the complexity of e-commerce frontends. We currently have several teams working on the next generation of frontend components along with the framework and SDK tools to build them... Stay tuned!
