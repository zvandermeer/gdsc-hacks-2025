import { useState, useEffect } from 'react'
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import Navbar from './components/Navbar';
import BirdFrame from './components/BirdFrame';
import ApiCalendar from "react-google-calendar-api";
import NewPage from './components/NewPage'
import './main.css';
import calendar from './assets/calendar.png'; 


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
  const [durationHours, setDurationHours] = useState("0");
  const [durationMinutes, setDurationMinutes] = useState("0");
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);


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
  const pad = (val) => val.toString().padStart(2, '0');
  const formattedDuration = `${pad(durationHours)}:${pad(durationMinutes)}`;

  const openEditTaskModal = (task) => {
    setTaskBeingEdited(task);
    const [h, m] = task.duration.split(":");
    setDurationHours(h);
    setDurationMinutes(m);
    setEditItemMenu(true);
  };
  
  const saveEditedTask = () => {
    const formattedDuration = `${pad(durationHours)}:${pad(durationMinutes)}`;
  
    const updatedTask = {
      ...taskBeingEdited,
      duration: formattedDuration,
    };
  
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
  
    setTasks(updatedTasks);
    setEditItemMenu(false);
    setTaskBeingEdited(null);
  };

  const addNewTask = () => {
    if(newTaskTitle.trim()){
      const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      duration: formattedDuration,
      time: newTaskTime || "12:00",
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
          onEdit={() => openEditTaskModal(task)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-2 pt-4 pb-6 border-t " style={{ boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)' }}>      
        <button 
        type="button" 
        onClick={() => setAddItemMenu(true)}
        className="text-black border-1 border-black font-medium text-sm w-23 rounded shadow-xs shadow-black">Add Task</button>
      </div>
      
    </div>

    {/*{(endMenu || userMenu || settingsMenu || editItemMenu) && (
      <NewPage />
    )}*/}
    {editItemMenu && taskBeingEdited && (
      <NewPage onClose={() => setEditItemMenu(false)}>
        <h2 className="text-xl font-bold mb-2">Edit Task</h2>
        <div className="space-y-4">
          <input
            className="border p-2 w-full"
            value={taskBeingEdited.title}
            onChange={(e) =>
              setTaskBeingEdited({ ...taskBeingEdited, title: e.target.value })
            }
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              className="border p-2 w-16 text-center"
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              placeholder="H"
            />
            <span className="text-xl">hours</span>
            <input
              type="number"
              min="0"
              max="59"
              className="border p-2 w-16 text-center"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="M"
            />
            <span className="text-xl">minutes</span>
          </div>
          <input
            type="time"
            className="border p-2 w-full"
            value={taskBeingEdited.time}
            onChange={(e) =>
              setTaskBeingEdited({ ...taskBeingEdited, time: e.target.value })
            }
          />
          <div className="flex justify-center gap-4">
            <button
              className="bg-black text-white px-4 py-2 rounded"
              onClick={() => saveEditedTask(taskBeingEdited)}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setEditItemMenu(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </NewPage>
    )}

    {addItemMenu && (
      <NewPage onClose={() => setAddItemMenu(false)}>
        <h2 className="text-xl font-bold mb-2">Add a New Task</h2>
        <div className="space-y-4">
          <input
            className="border p-2 w-full"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              className="border p-2 w-16 text-center"
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              placeholder="H"
            />
            <span className="text-xl">hours  </span>
            <input
              type="number"
              min="0"
              max="59"
              className="border p-2 w-16 text-center"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              placeholder="M"
            />
            <span className="text-xl">minutes</span>
          </div>
          <input
            type="time"
            className="border p-2 w-full"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
          />
          <div className='flex justify-center gap-4'>
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
        <h2 className="text-xl font-bold mb-2 mt-2 ml-1">Settings</h2>
        <div className="flex items-center gap-4 mt-2 mb-2">
        <input type="time" className="border p-2 w-[75%]"></input>
          <h2 className="text-xl font-bold">Regular Sleep Time</h2>
        </div>
        <div className="flex items-center gap-4 mt-2 mb-2">
        <input type="time" className="border p-2 w-[75%]"></input>
          <h2 className="text-xl font-bold">Regular Wake Time</h2>
        </div>
        
        
      </NewPage>
    )}

    {userMenu && (
      <NewPage onClose={() => setUserMenu(false)}>
        <h2 className="text-xl font-bold mb-2 mt-2 ml-1">Profile</h2>
        <div className="flex items-center gap-4 mt-2 mb-2">
          <button> <img src={calendar} className="w-24 h-auto" /> </button>
          <h2 className="text-xl font-bold">Link your Google Calendar</h2>
        </div>
      </NewPage>
    )}

    </>
  )
}

export default App
