require('babel-polyfill');
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
require.extensions['.css'] = () => {
  return;
};
require.extensions['.svg'] = () => {
  return '';
};

// Global variables needed for api_key.ts.
// The function getApiKey() is not really needed for the tests (we mock the
// access to tmdb), but it is executed as part of the instantiation of the
// Injector class.
process = process || {};
process.env = process.env || {};
process.env.apiKey = 'dummy';
