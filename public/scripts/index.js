const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement = document.getElementById("temp1");
const humElement = document.getElementById("hum1");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    // var dbPathTemp1 = 'device_1/' + uid.toString() + '/temperature';
    // var dbPathHum1 = 'device_1/' + uid.toString() + '/humidity';
    var dbPathTemp1 = 'device_1/temperature';
    var dbPathHum1 = 'device_1/humidity';

    // Database references
    var dbRefTemp1 = firebase.database().ref().child(dbPathTemp1);
    var dbRefHum1 = firebase.database().ref().child(dbPathHum1);

    // Update page with new readings
    dbRefTemp1.on('value', snap => {
      tempElement.innerText = snap.val();
    });

    dbRefHum1.on('value', snap => {
      humElement.innerText = snap.val();
    });


  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}