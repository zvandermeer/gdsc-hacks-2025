import { useState, useEffect } from 'react'
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import Navbar from './components/Navbar';
import BirdFrame from './components/BirdFrame';
import ApiCalendar from "react-google-calendar-api";
import NewPage from './components/NewPage'
import './main.css';


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
  const [tasks, setTasks] = useState([]);

  const [addItemMenu, setAddItemMenu] = useState(false);
  const [editItemMenu, setEditItemMenu] = useState(false);
  const [endMenu, setEndMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDuration, setNewTaskDuration] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');


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
  
  const addNewTask = () => {
    if(newTaskTitle.trim()){
      const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      duration: newTaskDuration || "15 MINUTES",
      time: newTaskTime || "12PM",
      checked: false
      }
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDuration("");
    setNewTaskTime("");
    setAddItemMenu(false);
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
    
    <Navbar setSettingsMenu={setSettingsMenu} setUserMenu={setUserMenu}
    />
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
        <button 
        type="button" 
        onClick={() => setAddItemMenu(true)}
        className="text-black border-1 border-black font-medium text-sm w-23 rounded shadow-xs shadow-black">Add Task</button>
      </div>
      
    </div>

    {/*{(endMenu || userMenu || settingsMenu || editItemMenu) && (
      <NewPage />
    )}*/}

    {addItemMenu && (
      <NewPage onClose={() => setAddItemMenu(false)}>
        <h2 className="text-xl font-bold mb-2">Add a New Task</h2>
        <div className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            placeholder="Duration (e.g. 30 MINUTES)"
            value={newTaskDuration}
            onChange={(e) => setNewTaskDuration(e.target.value)}
          />
          <input
            className="border p-2 w-full"
            placeholder="Time (e.g. 4PM)"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
          />
          <div className='flex justify-center gap-4 mt-2'>
          <button
            onClick={addNewTask}
            className="bg-black text-white px-4 py-2 rounded mt-2"
          >
            Add Task
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded mt-2"
          >
            Suggest
          </button>
          </div>
          
        </div>
      </NewPage>
    )}

    {settingsMenu && (
      <NewPage onClose={() => setSettingsMenu(false)}>
        <h2 className="text-xl font-bold mb-2">Settings</h2>
        <p>Settings content goes here.</p>
      </NewPage>
    )}

    {userMenu && (
      <NewPage onClose={() => setUserMenu(false)}>
        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <p>Profile content goes here.</p>
      </NewPage>
    )}

    </>
  )
}

export default App
