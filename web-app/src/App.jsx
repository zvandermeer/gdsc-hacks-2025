import { useState } from 'react'
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";

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
    }
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
  )
}

export default App
