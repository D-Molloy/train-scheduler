 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyARc6FL06wzs1-SRu6XCUW9nbyLdRgXHkw",
    authDomain: "train-scheduler-7e066.firebaseapp.com",
    databaseURL: "https://train-scheduler-7e066.firebaseio.com",
    projectId: "train-scheduler-7e066",
    storageBucket: "",
    messagingSenderId: "336436315525"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train').on('click', function(){
  	event.preventDefault();

  	var name = $("#name-input").val().trim();
  	var dest = $("#dest-input").val().trim();
  	var startTime = $("#start-input").val().trim();
  	var freq = $("#freq-input").val().trim();

  	database.ref().push({
            name: name,
            dest: dest,
            startTime: startTime,
            freq: freq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

  	});

    database.ref().on("child_added", function (childSnapshot) {

        // calculate months worked
        var curTime = moment().format('HH:mm');
        console.log("current time: "+curTime);
 
        var trainStart = childSnapshot.val().startTime
        console.log("inputted start time: " + trainStart)
        
    	var timeDif = Number(curTime) - Number(trainStart);
    	console.log(timeDif);

        //1- get current time (military)

        //2- get train start (military)

        //3- subtract train start from current time to get the difference  (not sure what to do about minutes)

        //4- multiply the difference * 60 to get the total number of minutes (totalMinutes) 

        //5- divide totalMinutes by the train frequency (minuteDif)

        //6- subtract Math.floor(minuteDif) from 60 to get Minutes Away

        //use the add method to add the minutes away to current time: moment().add(minutesAway, 'm')

        //???

        //profit


        var nextArrival = "Soon"
        var minAway = "a couple"

        // add new row to on-screen table
        $("#emp-table").append(
        	"<tr><td>" + childSnapshot.val().name + "</td>" +
            "<td>" + childSnapshot.val().dest + "</td>" +
            "<td>" + childSnapshot.val().freq + "</td>" +
            "<td>" + nextArrival + "</td>" +
            "<td>" + minAway + "</td></tr>");
        		// Number(months) * Number(childSnapshot.val().rate) 
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

