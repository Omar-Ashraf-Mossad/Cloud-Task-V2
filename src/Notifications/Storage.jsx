// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage,ref ,uploadBytes,listAll ,getDownloadURL} from "firebase/storage";



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
const storage = getStorage();


export function upload(image,id){
  const imageRef = ref(storage,"images/"+id+"/"+image.name);

  uploadBytes(imageRef, image).then(() => {
    console.log('Uploaded image!');
  });

}

export function getImages(id){
  const listRef = ref(storage,"images/"+id);
  return new Promise((resolve, reject) => {
    listAll(listRef)
      .then((res) => {
        const urlsPromises = res.items.map((itemRef) => {
          return getDownloadURL(itemRef);
        });
        Promise.all(urlsPromises)
          .then((urls) => {
            resolve(urls);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

}
