import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // 파이어스토어
import 'firebase/storage'; // 파이어스토리지 (이미지 저장소)
import 'firebase/database'; // RealTime DB

const firebaseConfig = {
    apiKey: "AIzaSyDfXNMekcLvfj24t5NZjfFSjlsJ12b8fgg",
    authDomain: "image-community-f8319.firebaseapp.com",
    projectId: "image-community-f8319",
    storageBucket: "image-community-f8319.appspot.com",
    messagingSenderId: "927166363378",
    appId: "1:927166363378:web:cba18425cb2991ab16426b"
  };
  // Initialize Firebase
const apiKey = firebaseConfig.apiKey;

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
//Storage Setting
const storage = firebase.storage();
const realtimeDB = firebase.database();

export {firebase,apiKey,firestore,storage,realtimeDB};