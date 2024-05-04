// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import { getDatabase,ref, set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBAl8mquQYHS4hVvWAS6HNR0W2_yBbJKl0",
  authDomain: "pushnotifications-f292f.firebaseapp.com",
  projectId: "pushnotifications-f292f",
  storageBucket: "pushnotifications-f292f.appspot.com",
  messagingSenderId: "961464856777",
  appId: "1:961464856777:web:7481df758bfd24bec55d18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export async function generateToken() {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BGtIyz9OycU5wHTWaXI4XoQUJMz5zcJLhCFT29v30dHjBiJyN_P8vr4wRtzor9kg_iuy_SLVHTN8NR0I4lTRYsQ",
    });
    console.log(token);
  }
  
}


//real time database
function getCurrentDateTimeString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// Store messages in the real time datbase
export function writeMessage(body){
  let date = getCurrentDateTimeString();
  const db = getDatabase();
  const refrence = ref(db,'message/'+date);
  console.log(date);
  set(refrence,
    body
  );
}


//Retrieve messages from the real time databse
import {  onValue } from "firebase/database";

const db = getDatabase();
const starCountRef = ref(db, 'message/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  update(data);
});

function update(data){
  let p = document.getElementsByName("list")[0];
  while (p.firstChild) {
    p.removeChild(p.firstChild);
  }
  for(const key in data){

    const value = data[key];
      
      let listItem = document.createElement("li");
      
      listItem.textContent = value;

      
      p.appendChild(listItem);
    }
}
