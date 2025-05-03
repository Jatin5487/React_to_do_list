import "./Todo.css";
import { useState, useEffect  } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";


import React from 'react'

const Todo = () => {
    const[inputValue, setInputValue] = useState("");
    const[task, setTask] = useState([]);
    const[dateTime, setDateTime] = useState("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const handleInputChnage =(value) =>{
        setInputValue(value)
    }
    const handleFormSubmit = (e) =>{
     e.preventDefault();
    

    if(!inputValue) return;

    if(task.includes(inputValue))
        { 
            setInputValue("");
            return;}
    

    setTask((prev) => [...prev, inputValue])

    setInputValue("");
    };

    //delete the array
    const handleDeleteElem = (value) =>{      
     const updatedtask = task.filter((currElem)=> value !== currElem);
     setTask(updatedtask)
    }

    //delet all
    const handleClearAll=()=>{
        setTask([]);
    }

//todo date-time

useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatDate = now.toLocaleDateString();
      const formatTime = now.toLocaleTimeString();
      setDateTime(`${formatDate} - ${formatTime}`);
    }, 1000);
  
    return () => clearInterval(interval); // ✅ clean up on unmount
  }, []);


  //Localstorage implementation

  // Load tasks from localStorage on first render
  useEffect(()=>{
    const savedTask = JSON.parse(localStorage.getItem("tasks"));
    if(savedTask){
        setTask(savedTask);
    }
    setIsInitialLoad(false);
  },[]);
  
  // Save tasks to localStorage whenever task list changes
  useEffect(()=>{
    if (!isInitialLoad) {
        localStorage.setItem("tasks", JSON.stringify(task));
      }
    }, [task, isInitialLoad]);

  return (
    <section>
        <header>
            <h1 style={{color:"black"}}>Todo List</h1>
            <h2 className="date-time">{dateTime}</h2>
        </header>

        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div>
                <input type="text"
                 className="todo-input" 
                autoComplete="off" 
                value={inputValue} 
                onChange={(e) =>handleInputChnage(e.target.value)}/>
                </div>

                <div>
                    <button type="submit" className="todo-btn">Add Task</button>
                </div>
            </form>
        </section>

        <section className="myUnOrdList">
          <ul>
            {task.map((currElem, index)=>{
                return(
                <li key={index} className="todo-item">
                    <span>{currElem}</span>
                  <button className="check-btn"><MdCheck /> </button>
                 
                  <button className="delete-btn"
                   onClick={() => handleDeleteElem(currElem)}>
                    <MdDeleteForever />
                    </button>
                </li> 
            );
            })}
          </ul>
        </section>
        <section style={{textAlign:"center"}}>
            <button className="clear-btn" onClick={handleClearAll}>Clear all</button>
        </section>
    </section>
  )
}

export default Todo
