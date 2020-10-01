import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "react-imageupload.firebaseapp.com",
  databaseURL: "https://react-imageupload.firebaseio.com",
  projectId: "react-imageupload",
  storageBucket: "react-imageupload.appspot.com",
  messagingSenderId: "671360828621",
  appId: "1:671360828621:web:6776b39e9607b6263b5584",
  measurementId: "G-P5FN833ZQN",
};
console.log(process, "process");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize the storage as a variable
const storage = firebase.storage();
firebase.analytics();

export { storage, firebase as default };
