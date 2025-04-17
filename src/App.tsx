import React from 'react';
import './App.css';
import {ToDoList} from "./todo_list/ToDoList";
import {TaskType} from "./todo_list/ToDoList"

function App() {

    let tasks1: Array<TaskType> =[
        {id: 1, title:"CSS", isDone: true},
        {id: 2, title:"JS", isDone: true},
        {id: 3, title:"react", isDone: false},
    ]

    let tasks2: Array<TaskType> =[
        {id: 1, title:"terminator", isDone: true},
        {id: 2, title:"xxx", isDone: true},
        {id: 3, title:"gentlments of fortune", isDone: false},
    ]

  return (
    <div className="App">
      <ToDoList title={"What to learn"} tasks={tasks1}/>
      <ToDoList title={"Movies"} tasks={tasks2}/>
    </div>
  );
}

export default App;