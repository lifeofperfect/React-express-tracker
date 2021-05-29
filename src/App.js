
import {useState, useEffect} from 'react'
import Header from './components/Header';
import Tasks from '../src/components/Tasks'
import AddTask from '../src/components/AddTask'
import Footer from '../src/components/Footer'
import About from './About';

import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    const fetchTasks= async ()=> {
      const res = await fetch(`http://localhost:5000/tasks`);
      const data = await res.json();

      setTasks(data)
      console.log(tasks)
    }
    fetchTasks()
  }, [])

  const name="perect"

  const deleteTask= async (id)=> {
    //setTasks((tasks.filter((task)=> task.id !== id)))
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter(task=> (
      task.id !== id
    )))
  }

  const getTask=async (id)=> {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();

    return data;
  }

  const toggleReminder=async (id)=> {

    const taskToToggle = await getTask(id);
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json();

    setTasks(
      tasks.map(
        (task)=> (
          task.id === id ? {...task, reminder: data.reminder} : task
        )
      )
    )
  }

  const addTask= async (task)=> {

    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random()*100)+1

    // const newTask = {id, ...task}

    // setTasks([...tasks, newTask])
    
  }

  const clickButton=()=> {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
    <div className="App">
      <Header title="Tracker app" buttonClick={clickButton} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? 
      <Tasks 
        tasks={tasks}
         onDelete={deleteTask}
         onToggle={toggleReminder}
         /> :
      "No tasks to show"
    }
    <Route path="/" exact render={(props)=> {
      
    }}/>
    <Route path="/about" component={About} />
    <Footer />
    </div>
    </Router>
  );
}

export default App;
