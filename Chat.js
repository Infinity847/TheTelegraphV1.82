document.onkeydown=function(e)
    {
        if (event.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
return false;
        }
    }
var status = localStorage.getItem("Status");
if (status == undefined) {
    localStorage.setItem("Status", 1);
    status = 1;
}
var UserStat2 = localStorage.getItem("userstat2");
if (UserStat2 == "false") {
window.alert(`
What did the app tell you again??
You are banned. Now get out my app
please.
`);
window.location = "index.html";
}
function backtohome() {
    window.location = "main.html";
}
var menu = false;
var image = "";
//YOUR FIREBASE LINKS

const firebaseConfig = {
    apiKey: "AIzaSyDaGspMMowJA1XcKCV502gbph_VeT9mgSo",
    authDomain: "letschat-d3f44.firebaseapp.com",
    databaseURL: "https://letschat-d3f44-default-rtdb.firebaseio.com",
    projectId: "letschat-d3f44",
    storageBucket: "letschat-d3f44.appspot.com",
    messagingSenderId: "1061774008972",
    appId: "1:1061774008972:web:d7c6224c564bd7c760d1a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("Telegraph||Username");
room_name = localStorage.getItem("room_name");
if (user_name == undefined) {
    window.location = "index.html"
    }else {
    
    }
function send() {
    msg = document.getElementById("message").value;
if (msg.includes("<")) {
  if (status == 2) {
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 50
    });
    document.getElementById("message").value = "";
  }else {
    window.alert("You are not allowed to use tags.");
  }
}else {
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("message").value = "";
}
}
function sttsend(inputsend) {
    if (inputsend.includes("<")) {
  if (status == 2) {
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 50
    });
  }else {
    window.alert("You are not allowed to use tags.");
  }
  
}else {
    firebase.database().ref(room_name).push({
        name: user_name,
        message: inputsend,
        like: 0
    });
}
}
function sendimg(img) {
    firebase.database().ref(room_name).push({
        name: user_name,
        message: img,
        like: 0
    });
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> Username : " + name + "</h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class = 'likebtn' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span id = 'innerlikebtn' >&#x1F44D;Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });

}


  Webcam.set({
    width:100,
    height:100,
    image_format : 'png',
    png_quality:90
  })

function open() {
    document.getElementById("area").innerHTML = "<center><div id = 'camera'></div><button onclick = 'picture()' class = 'btn'>Take Picture</button><button onclick = 'sendimgcheck()' class = 'btn'>Send Image</button><div id = 'result'></div></center>" 
    camera = document.getElementById("camera");
    Webcam.attach( camera );  
menu = true;
}
function close() {
    document.getElementById("area").innerHTML = "";
    menu = false;
}
function picture() {
 Webcam.snap(function(data_uri) {
    image = '<img id = "captured_image" src = "' + data_uri + '"/>';
document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '"/>';
    });
}
function sender() {
if (menu) {
close();
}else {
    open();
}
}
function sendimgcheck() {
    if (image == "" ) {
        window.alert("You have not tooken a picture yet!")
    }else {
        sendimg(image);
    }
}
function stt() {
recognition.start();
}
var SP = window.webkitSpeechRecognition;
var recognition = new window.webkitSpeechRecognition(); 
recognition.onresult = function(event)
{

 console.log(event); 
content = event.results[0][0].transcript;
sttsend(content);
}
//recognition.start();