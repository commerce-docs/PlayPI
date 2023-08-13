# Commerce API Explorer

With just three GraphQL queries, this simple React app highlights only a small part of Adobe's extensive Commerce API. The three queries focus on fetching product data to drive a simple products page that might exist in a larger storefront. The app fetches all its content from our example Venia store: [venia.magento.com](https://venia.magento.com).

Make no mistake, this project is not a beacon of best practices. And it's not intended to be. [Other teams at Adobe are working on that](#the-future-of-adobe-commerce-frontend-components). 

The intent of this project is to show you some of the data — product data — you can retrieve from our Commerce API. 

The project features some **GraphQL queries** and how you can use that data in a storefront. Best practices and specifics for building components that use the data are beyond the scope of this project. Again, we have several teams working on that.

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

For the sake of instruction, each query has a corresponding component to display the data returned:

- `ProductCategories.jsx`
- `ProductList.jsx` 
- `ProductDetails.jsx`

The `base` directory contains a variety of other components used within the three main components.

Tailwindcss is used for all component styling.

## Run the app

1. Clone the repo: `git clone git@github.com:commerce-docs/playpi.git`
2. Change directories: `cd playpi`
3. Run `yarn` to install dependencies.
4. Run `yarn start:server` to start the project's proxy server so you can access Venia's GraphQL endpoint.
5. Open another terminal (to keep the proxy-server running)
6. Run `yarn dev` to launch the product page example.

## Things to finish

- **Done**. ~~Fix color and size configurable options.~~
- **Done**. ~~Display `ProductDetails` in a modal. Currently, the product details appears at the bottom of the page.~~
- *In-Progress*. Use [Stackblitz](https://stackblitz.com/) or [Codesandbox](https://codesandbox.io/) to sandbox the project.
- Create a "data-only" view. No product images or text will be displayed. Only the GraphQL fields and the component name that uses them will be rendered on the screen—in boxes at the same locations in the UI. The purpose is to demonstrate how data from the Commerce GraphQL API feeds a frontend — any frontend! 

## The future of Adobe Commerce frontend components

If nothing else, this project should demonstrate just how hard it is to create good frontend components! And frontend **commerce components** are even harder, and far more complex.

But someone has to do it. And do it right! That's exactly what we're doing here at Adobe. We currently have several teams working on our next generation of storefront components along with the SDK tools to build them... Stay tuned!
