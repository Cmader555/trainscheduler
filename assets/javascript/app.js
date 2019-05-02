

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


$(".submit").on("click", function (event) {

  event.preventDefault();

  var trainName = $("#tName").val().trim();
  var destination = $("#tDestination").val().trim();
  var trainTime = $("#tTime").val().trim();
  var frequency = $("#frequency").val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,

  });


});

database.ref().on("child_added", function (snapshot) {
  // making the snapshot val equal to a variable so there is less clutter
  var sv = snapshot.val();
  // subtracting 1 24 hour period from the moment of traintime inputed by user, ensures train start time is always less then current time
  var firstTrainNew = moment(sv.trainTime, "HH:mm").subtract(1, "days");
  //console.log(firstTrainNew); 
  // difference in time between current time and first Train start time
  var diffTime = moment().diff(moment(firstTrainNew), "minutes");
  //console.log(diffTime); 
  // remainder of time
  var remainder = diffTime % sv.frequency;
  //console.log(remainder); 
  //frequency chosen minus the remainder time gives you the amount of remaining minutes before next train
  var minsAway = sv.frequency - remainder;
  // adding how many minutes you have remaining to the current time to give you the time at which next train is coming
  var nextTrain = moment().add(minsAway, "minutes");
  // formatting time so it appears correctly on HTML
  nextTrain = moment(nextTrain).format("HH:mm");


  var newRow = $("<tr>").append(
    $("<td>").text(sv.trainName),
    $("<td>").text(sv.destination),
    $("<td>").text(sv.frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minsAway),

  );
  $(".traintable tbody").append(newRow);


  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



$(".reset").on("click", function () {

  var updates = {};
  database.ref().set({

    updates: updates
  });

  $(".traintable tbody").empty();

}); 
