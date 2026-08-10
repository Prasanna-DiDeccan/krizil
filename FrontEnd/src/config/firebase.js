// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCG9LyAkQWiWN4EwrvEEb0_ynS5r2kW3w",
//   authDomain: "krizil.firebaseapp.com",
//   projectId: "krizil",
//   storageBucket: "krizil.firebasestorage.app",
//   messagingSenderId: "421596070154",
//   appId: "1:421596070154:web:272b02bbe52bc521ad7af3",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

import { getApp } from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

export { auth };

export const firebaseApp = getApp();