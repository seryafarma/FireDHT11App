const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement1 = document.getElementById("temp1");
const humElement1 = document.getElementById("hum1");
const tempElement2 = document.getElementById("temp2");
const humElement2 = document.getElementById("hum2");

const dbPathTemp = ["device_1/temperature", "device_2/temperature"]
const dbPathHum = ["device_1/humidity", "device_2/humidity"]

var mappings =
  [
    {
      "element": document.getElementById("temp1"),
      "references": firebase.database().ref().child(dbPathTemp[0])
    },
    {
      "element": document.getElementById("temp2"),
      "references": firebase.database().ref().child(dbPathTemp[1])
    },
    {
      "element": document.getElementById("hum1"),
      "references": firebase.database().ref().child(dbPathHum[0])
    },
    {
      "element": document.getElementById("hum2"),
      "references": firebase.database().ref().child(dbPathHum[1])
    }
  ]

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display = 'block';
    userDetailsElement.style.display = 'block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    for (const each of mappings) {
      each.references.on('value', snap => {
        each.element.innerText = snap.val();
      });
    }
    // if user is logged out
  } else {
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display = 'none';
    userDetailsElement.style.display = 'none';
    contentElement.style.display = 'none';
  }
}