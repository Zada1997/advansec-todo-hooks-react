import React, { useState } from 'react'

function Tasks() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputEdit, setInputEdit] = useState("");
    const [totalTasks, setTotalTasks] = useState(0)
    const addTask = ()=>{
        if(inputValue){
            const todoToAdd = {task: inputValue, isDone: false, editText : "", isEditing: false}
            let count = todos.length
            count++
            setTodos([...todos, todoToAdd])
            setInputValue("")
            setTotalTasks(count)
        }
        
    }
    const complete = (index) => {
        const copyTodos = [...todos]
        copyTodos[index].isDone = !copyTodos[index].isDone
        setTodos(copyTodos)
        let count = totalTasks
        if(copyTodos[index].isDone){
            count --
        }else{
            count++
        }
        setTotalTasks(count)
    }
    const deleteTask = (index)=>{
        const copyTodos = [...todos]
        copyTodos.splice(index, 1)
        setTodos(copyTodos)
    }
    const editTask = (index) =>{
        const copyTodos =[...todos]
        copyTodos[index].isEditing = !copyTodos[index].isEditing
        if(copyTodos[index].isEditing){
            setInputEdit("")
        }else{
            if(inputEdit){
                copyTodos[index].task = inputEdit
            }
        }
        setTodos(copyTodos)
    }
  return (
    <div>
        <h1>Pending tasks ({totalTasks}) </h1>
        <input type="text" placeholder='Add a new task' value = {inputValue} onChange = {(e)=>{setInputValue(e.target.value)}} />
        <button onClick = {()=>addTask()}>Add</button>
        <ul>
            {todos.map((todo, index)=>{
                
                return(
                    <li className='single-task' key = {index}> 
                        <div className='header'>
                            { todo.isEditing ? <input onChange={(e)=>setInputEdit(e.target.value)} type= "text" placeholder={todo.task} value = {inputEdit}/> : <p className={todo.isDone?"done":"todo"}>{todo.task}</p> }

                        </div>
                        <div className='btns'>
                            <button onClick = {()=>complete(index)}>Complete</button>
                            <button onClick={()=>editTask(index)}>{todo.isEditing?"Done":"Edit"}</button>
                            <button  className='delete-btn' onClick={()=> deleteTask(index)}>X</button>

                        </div>
                    </li>
                )
            })}
            
        </ul>
    </div>
  )
}

export default Tasks