export function getApiKey(): string {
  if (!process.env.apiKey) {
    throw new Error(
      'You need to specify your tmdb api-key. You can do so by specifying ' +
        '--env.apiKey=<yourkey> in the command line. For example:\n' +
        '$ npm run serve-dev  -- --env.apiKey=<yourkey>',
    );
  }
  return process.env.apiKey;
}
