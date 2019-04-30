

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAWAW3EfEytJX0meJ0wCPhQL1VJNhzZh6Y",
    authDomain: "trainscheduler-70ad2.firebaseapp.com",
    databaseURL: "https://trainscheduler-70ad2.firebaseio.com",
    projectId: "trainscheduler-70ad2",
    storageBucket: "trainscheduler-70ad2.appspot.com",
    messagingSenderId: "556115659826"
  };
  firebase.initializeApp(config);

  //setting firebase invoke to variable

  var database = firebase.database(); 