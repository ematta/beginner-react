import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCgQUFVdDkmz67U-FxxTi8yycO7zEBiU6w",
  authDomain: "catch-of-the-day-enrique-98c09.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-enrique-98c09-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
