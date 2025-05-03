import { useState } from 'react'
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import Navbar from './components/Navbar';
import BirdFrame from './components/BirdFrame';
import ApiCalendar from "react-google-calendar-api";
import NewPage from './components/NewPage'
const gcalClientId = import.meta.env.VITE_GCAL_CLIENT_ID;
const gcalApiKey = import.meta.env.VITE_GCAL_API_KEY;
const birdStatus = 'normal';

const gcalConfig = {
  clientId: gcalClientId,
  apiKey: gcalApiKey,
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(gcalConfig);

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
  const apiURL = import.meta.env.VITE_API_URL;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch(apiURL + '/subscribe', {
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

  const [birdState, setBirdState] = useState(birdStatus);

  const handleBirdReaction = (task, event) => {
    if (!task.checked && event.target.checked) {
      setBirdState('happy');
      setTimeout(() => setBirdState(birdStatus), 6000);
    }
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
    
    <Navbar/>
    <BirdFrame birdState={birdState}/>
    <div className='flex flex-col justify-end min-h-screen pb-4'>
      <div className="flex justify-center">
        <ProgressBar numerator={numerator} denominator={denominator}/>
      </div>
      <p className='text-xs ml-12 font-semibold pt-0.5 pb-4'>today's progress</p>
      
      <div className="min-h-[210px] max-h-[210px] overflow-y-auto space-y-2">
        {tasks.map(task => (
          <TaskItem 
          key={task.id} 
          task={task} 
          onChange={() => toggleCheck(task.id)} 
          onClick={(e) => handleBirdReaction(task, e)}
          onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-2 pt-4 pb-6 border-t">      
        <button type="add-button" className="text-black border-1 border-black font-medium text-sm w-23 rounded">Add Task</button>
      </div>
      
    </div>
    

    

    </>
  )
}

export default App
