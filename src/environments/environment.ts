// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAZ7XLdzsugi1yUh2gyMt4_yDM2b5XiFZA',
    authDomain: 'firechat-8f7ca.firebaseapp.com',
    databaseURL: 'https://firechat-8f7ca.firebaseio.com',
    projectId: 'firechat-8f7ca',
    storageBucket: 'firechat-8f7ca.appspot.com',
    messagingSenderId: '124381305625'
  }
};
