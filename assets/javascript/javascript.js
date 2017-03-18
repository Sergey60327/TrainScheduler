
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIStECjuAEvSHWE778XpRrAo3LfZ3kqpo",
    authDomain: "first-one-ab306.firebaseapp.com",
    databaseURL: "https://first-one-ab306.firebaseio.com",
    storageBucket: "first-one-ab306.appspot.com",
    messagingSenderId: "907240277921"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

$("#add-schedule-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#freq-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: firstTrain,
    frequency: frequency
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#firstTrain-input").val("");
  $("#freq-input").val("");
  
  return false;
});



//  Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
  
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  
  
  // Converts First Train start Time into moment.js format
  var stringTimeFormat = moment(firstTrain, "hh:mm a");
  
  //calculate minutes from first train time until now
  var minutesFromFirst = moment().diff(stringTimeFormat, "minutes");

  // calculate how many minutes since last train
  var minutesSinceLast= minutesFromFirst % frequency ;
  
  var minutesAway = frequency - minutesSinceLast;
  
  var nextArrival = moment().add(minutesAway, "minutes").format("LT");
  
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +frequency + "</td><td>" +
  nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});