import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function randomNotification() {
  const notifTitle = `This is a notification`;
  const notifBody = `Created by bob.`;
  const options = {
    body: notifBody,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <button 
      onClick={() => {
        Notification.requestPermission().then((result) => {
          if (result === "granted") {
            randomNotification();
          }
        });
      }}
    >
      Click me to notify!
    </button>
  )
}

export default App
