const admin = require("firebase-admin");
const functions = require("firebase-functions");
const env = functions.config();

// Initialize Firebase
const config = {
  apiKey: env.fb.apikey,
  authDomain: env.fb.authdomain,
  databaseURL: env.fb.databaseurl,
  projectId: env.fb.projectid,
  storageBucket: env.fb.storagebucket,
  messagingSenderId: env.fb.messagingsenderid
};
admin.initializeApp(config);

module.exports = admin;