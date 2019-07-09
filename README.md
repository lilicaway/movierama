# MovieRama:

'Yet another movie catalog'

## What is this?

This application is a solution for a movie catalog, which is implemented using vanilla Javascript ES6 (i.e. no web frameworks), together with Webpack HMR and Typescript. Uses the [tmdb](https://www.themoviedb.org) as the backend providing the movie data.

This project is build on top of the following technologies:

- Babel to transform TypeScript to plain JavaScript
- TypeScript for type-checking
- Webpack for HMR (Hot Mode Reload) and support for `.css` files.
- Prettier for formatting
- tslint for styles
- jasmine for testing

It is based on my template [TypeScript-Babel-Webpack-Starter](https://github.com/lilicaway/TypeScript-Babel-Webpack-Starter)

## Demo

A demo of this app is deployed using [Heroku](https://www.heroku.com/).

You can check it at https://movierama-lilicaway.herokuapp.com/

## How do I run it locally?

I haven't added the `apiKey` to the repository for security reasons, instead I have set it up so the `apiKey` is received as an [environment variable using webpack](https://webpack.js.org/guides/environment-variables/).

Read [here](https://developers.themoviedb.org/3/getting-started/introduction) for instructions on how to generate your own `apiKey`.

### Serve in development mode

This includes HMR (Hot Mode Reload).

```sh
TMDB_API_KEY=<yourTmdbApiKey>
npm run serve-dev  -- --env.apiKey=${TMDB_API_KEY}
```

### Serve in production mode

```sh
TMDB_API_KEY=<yourTmdbApiKey>
npm run build:webpack -- --env.apiKey=${TMDB_API_KEY} && \
 npm run serve-prod
```

### Run unit tests with Jasmine

```sh
npm run test
```

You can also check coverage with:

```sh
npm run testWithCoverage
```

### Building the repo

```sh
npm run build
```

### Type-checking the repo

```sh
npm run type-check
```

And to run in `--watch` mode:

```sh
npm run type-check:watch
```

### Format and style fixes

To detect and attempt to fix lint issues:

```sh
npm run tslint-fix
```

To auto-format all files:

```sh
npm run prettier-fix
```

To do both together:

```sh
npm run fix
```

## High level architecture

The application has three well defined layers:

### - api

This layer is about the communication with the backend data and it is represented by the `src/api` folder.

It basically has all the code that takes care of communicating with tmdb. Requests and responses definitions, as well as the api interface are defined here.

### - services and data model.

Here lives all the code that offers the UI the exact API it needs to display the information it needs. It is represented by the folders `src/services` and `src/model`.

The `services` implement the business logic and the `model` has the interfaces used to communicate with the `components`.

### - components

All the UI code that takes care of displaying the information and handle user input (Smart and dumbs components) are located here. It is represented by the folder `src/components`.

The components are supposed to communicate only with the services layer and never directly with the api layer.

Most components are basically a function that returns an HTMLElement with all its event handlers configured so that it can be appended directly into the DOM.

In order to be able to write these components in a nicer way I created a `createEl` function (located in `src/components/dom_helpers/basic.ts`) that allows you to write hierarchical code to generate the DOM elements. It allows you to write code similarly to how you would do with [react](https://reactjs.org) if you didn't use [JSX](https://reactjs.org/docs/introducing-jsx.html). It is way more limited than what react can do, of course. There are many other little helper functions in there, but this is the most important one because it is used by virtually all the components.

## Limitations

- There is a basic testing on some of the most important features, but not everything is tested. These tests should serve as examples on how similar tests can be written.
- Needs a better "Error handling"
- It only displays well on Desktop (I didn't use media-queries on the CSS)
- The state is not stored on the browser's URL, so if you refresh the page
  it goes to the initial state.
- Details for a "Movie" is only available on the Search Results page.
