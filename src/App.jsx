import { useEffect } from "react";
import { generateToken } from "./Notifications/Notif";
import { onMessage } from "firebase/messaging";
import { messaging,writeMessage } from "./Notifications/Notif";
function App() {
  useEffect(() => {
    generateToken();
    let title,body;
    onMessage(messaging, (payload) => {
      console.log(payload);
      body = payload.notification.body;
      writeMessage(body);
    });

    
  }, []);
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
