const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement1 = document.getElementById("temp1");
const humElement1 = document.getElementById("hum1");
const tempElement2 = document.getElementById("temp2");
const humElement2 = document.getElementById("hum2");

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
    var dbPathTemp1 = 'device_1/temperature';
    var dbPathHum1 = 'device_1/humidity';
    var dbPathTemp2 = 'device_2/temperature';
    var dbPathHum2 = 'device_2/humidity';

    // Database references
    var dbRefTemp1 = firebase.database().ref().child(dbPathTemp1);
    var dbRefHum1 = firebase.database().ref().child(dbPathHum1);
    var dbRefTemp2 = firebase.database().ref().child(dbPathTemp2);
    var dbRefHum2 = firebase.database().ref().child(dbPathHum2);

    // Update page with new readings
    dbRefTemp1.on('value', snap => {
      tempElement1.innerText = snap.val();
    });

    dbRefHum1.on('value', snap => {
      humElement1.innerText = snap.val();
    });

    dbRefTemp2.on('value', snap => {
      tempElement2.innerText = snap.val();
    });

    dbRefHum2.on('value', snap => {
      humElement2.innerText = snap.val();
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