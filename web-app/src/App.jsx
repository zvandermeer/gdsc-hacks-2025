import { useState, useEffect } from 'react'
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import Navbar from './components/Navbar';
import BirdFrame from './components/BirdFrame';
import ApiCalendar from "react-google-calendar-api";

const gcalClientId = import.meta.env.VITE_GCAL_CLIENT_ID;
const gcalApiKey = import.meta.env.VITE_GCAL_API_KEY;

const gcalConfig = {
  clientId: gcalClientId,
  apiKey: gcalApiKey,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(gcalConfig);

const apiURL = import.meta.env.VITE_API_URL;
let uuid = getCookie("appUUID");

if (uuid === undefined) {
  uuid = crypto.randomUUID();
  document.cookie = "appUUID=" + uuid + ";"
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

  await fetch(apiURL + '/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uuid: uuid,
      subscription
    })
  });

  console.log('User subscribed.');
}

async function scheduleNotification(title, body, time) {
  await fetch(apiURL + '/schedule', {
    method: 'POST',
    body: JSON.stringify({
      uuid: uuid,
      time: time,
      title: title,
      body: body,
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  alert("Notification scheduled!");
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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "take a walk",
      duration: "15 MINUTES",
      time: "5PM",
      checked: false,
    },
    {
      id: 2,
      title: "meditate",
      duration: "20 MINUTES",
      time: "3PM",
      checked: false,
    },
    {
      id: 3,
      title: "study",
      duration: "45 MINUTES",
      time: "1PM",
      checked: false,
    },
    {
      id: 4,
      title: "test",
      duration: "25 MINUTES",
      time: "7PM",
      checked: false,
    },

  ]);

  const toggleCheck = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };
  const numerator = tasks.filter(task => task.checked).length;
  const denominator = tasks.length
  return (
    <>
    <Navbar/>
    <BirdFrame birdState={'normal'}/>
    <div className='flex flex-col justify-end min-h-screen pb-4'>
      <div className="flex justify-center">
        <ProgressBar numerator={numerator} denominator={denominator}/>
      </div>
      <p className='text-xs ml-16 font-semibold pb-2'>today's progress</p>
      <div className="flex justify-center">      
        <button type="button" className="text-black border-1 border-black font-medium text-sm w-20 rounded">Add a Task</button>
      </div>
      <div className="min-h-[210px] max-h-[210px] overflow-y-auto space-y-2">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onChange={() => toggleCheck(task.id)} />
        ))}
      </div>
      
    </div>
    </>
  )
}

export default App
