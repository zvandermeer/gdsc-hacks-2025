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
  // setTimeout(randomNotification, 30000);
}

async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register('/sw.js');
  return registration;
}

async function subscribeUser(registration) {
  const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch('https://fe04-131-104-23-190.ngrok-free.app/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });

  console.log('User subscribed.');
}

// Utility: Convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const raw = atob(base64);
  return new Uint8Array([...raw].map(char => char.charCodeAt(0)));
}


function App() {
  return (
    <>
      <button 
        onClick={() => {
          Notification.requestPermission().then((result) => {
            if (result === "granted") {
              randomNotification();
            }
          });
        }}
      >
        Notify
      </button>

      <button
        onClick={async () => {
          if ('serviceWorker' in navigator && 'PushManager' in window) {
            const registration = await registerServiceWorker();
            await subscribeUser(registration);
          } else {
            alert("Push messaging is not supported in your browser.");
          }
        }}
      >
        register
      </button>

      <button
        onClick={async () => {
          const delay = 20;
          await fetch('https://fe04-131-104-23-190.ngrok-free.app/schedule', {
            method: 'POST',
            body: JSON.stringify({
              title: "Scheduled Notification",
              body: "This was scheduled from the browser!",
              delay
            }),
            headers: { 'Content-Type': 'application/json' }
          });

          alert("Notification scheduled!");
        }}
      >
        Schedule
      </button>
    </>
  )
}

export default App
