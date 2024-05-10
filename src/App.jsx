import { useEffect, useState } from "react";
import { generateToken } from "./Notifications/Notif";
import { onMessage } from "firebase/messaging";
import { messaging,writeMessage } from "./Notifications/Notif";
import {upload,getImages, deleteImage} from "./Notifications/Storage"
function App() {

  useEffect(() => {
    generateToken();
    let body;
    onMessage(messaging, (payload) => {
      console.log(payload);
      body = payload.notification.body;
      writeMessage(body);
    });

    
  }, []);

  const [image,setImage] = useState(null);
  const [id,setID] = useState(0);
  const handleChange= (e)=>{
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }

  };

  const handlesubmit = ()=>{
    if(image){
        upload(image,id);
    }
  }

  const getFiles = ()=>{
    let container = document.getElementsByName("Images")[0];
    container.innerHTML="";
    getImages(id)
    .then((urls) => {
      if(urls.length==0){
        container.innerHTML="- No Images exist for this user id";
      }
      for(let i in urls){

        let li = document.createElement("li");
        let img = document.createElement("img");
        let btn = document.createElement("button");
       
        img.setAttribute('src',urls[i][0]);
        li.appendChild(img);
        li.appendChild(btn);
        container.appendChild(li);
        btn.style.backgroundColor = "blue";
        btn.innerHTML = "Delete";
     
        btn.onclick =()=> deleteImage(urls[i][1],li);

      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  return (
    <>
      <h1>Hello</h1>
      <h2> Notifications:</h2>
    
      <ul name="list">
        
      </ul>
      
      <br />
      <div name="upload" style={{border:"dotted",padding:"10px"}}>
         <h3>Upload</h3>
          <label htmlFor="ID" >Enter User ID</label>
          <input name="ID" type ="number" onChange={(e)=> setID(e.target.value)}/>
          <br />
          <br />
            <input type="file" onChange={handleChange} />
            <button onClick={handlesubmit}>Upload</button> 
            <br />
            <br />
      </div>

      <div name="downlod" style={{border:"dotted",padding:"10px"}}>
         <h3>Download</h3>
          <label htmlFor="ID" >Enter User ID</label>
          <input name="ID" type ="number" onChange={(e)=> setID(e.target.value)}/>
          <button onClick={getFiles}>Retrieve</button> 
          <br />
          <br />
           <div name="Images"> </div>

            <br />
            <br />
      </div>
    </>
  );
}

export default App;
