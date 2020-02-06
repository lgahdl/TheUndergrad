import firebase from "firebase";

let config = {
  apiKey: "AIzaSyDtGSRv7y30AYhX2RJHuvrjngahSXoSUuk",
  authDomain: "app-venda.firebaseapp.com",
  databaseURL: "https://app-venda.firebaseio.com",
  projectId: "app-venda",
  storageBucket: "app-venda.appspot.com",
  messagingSenderId: "712368372491",
  appId: "1:712368372491:web:efee178c04ed20ad"
};

firebase.initializeApp(config);

export default firebase;
