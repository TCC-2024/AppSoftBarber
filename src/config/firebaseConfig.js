import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig1 = {
    apiKey: "AIzaSyBJQDQpDRoFyf2Vbh7oJ_CkECEu1sqZsFc",
    authDomain: "softbarbertcc24.firebaseapp.com",
    projectId: "softbarbertcc24",
    storageBucket: "softbarbertcc24.appspot.com",
    messagingSenderId: "450304266937",
    appId: "1:450304266937:web:dbce3bd6d6342c09af4168",
    measurementId: "G-BHEP88S6VG"
};

const firebaseConfig2 = {
    apiKey: "AIzaSyDp9giQC4MIw0_8aODEoJctGRmNTbhD-Ws",
    authDomain: "softbarberprotcc.firebaseapp.com",
    projectId: "softbarberprotcc",
    storageBucket: "softbarberprotcc.appspot.com",
    messagingSenderId: "780812922675",
    appId: "1:780812922675:web:69cae2384db309cd551846",
    measurementId: "G-D63QGC4EH5"
};

const app1 = initializeApp(firebaseConfig1);
export const auth1 = initializeAuth(app1, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db1 = getFirestore(app1);

const app2 = initializeApp(firebaseConfig2, "Segundo");
export const auth2 = initializeAuth(app2, {
    persistence: getReactNativePersistence(AsyncStorage)
});
export const db2 = getFirestore(app2);