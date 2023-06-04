// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8eViW4cxYx6Jh5obZLLqgRdS46a7F_E8",
  authDomain: "projeto-crud-38f0e.firebaseapp.com",
  databaseURL: "https://projeto-crud-38f0e-default-rtdb.firebaseio.com",
  projectId: "projeto-crud-38f0e",
  storageBucket: "projeto-crud-38f0e.appspot.com",
  messagingSenderId: "293614848278",
  appId: "1:293614848278:web:14292563004d220fcea837"
};
  //inicializando o Firebase
  firebase.initializeApp(firebaseConfig)
  //efetuando a ligação com o database
  const database = firebase.database()