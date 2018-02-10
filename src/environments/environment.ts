// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyAu-6HZjhT7LNY-Qk7KiqVH6ESSE2TYyVI",
    authDomain: "mini-social-db.firebaseapp.com",
    databaseURL: "https://mini-social-db.firebaseio.com",
    projectId: "mini-social-db",
    storageBucket: "mini-social-db.appspot.com",
    messagingSenderId: "650596590963"
  }
};
