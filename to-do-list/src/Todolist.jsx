import React,{useState,useEffect} from "react"
import todologo from "./assets/todolist.jpg"

function Todolist(){
    
    const storedTasks=JSON.parse(localStorage.getItem('allTasks'));
    const[tasks, setTasks] =useState(storedTasks);
    const[newTask, setnewTask] = useState();
    
    function handleInputChange(event){
          setnewTask(event.target.value);
    }
    
    useEffect(()=>{                                   // whenever the tasks state variable changes we are storing it to the localStorage of browser
      localStorage.setItem('allTasks',JSON.stringify(tasks))
      
    }, [tasks] )

    function handleClick(){
      let count=0;
        tasks.forEach(task => {
          if(task==newTask){
            count++
          }
        });
        if(count==0 && newTask.trim()!==""){
            setTasks(t => [ ...t , newTask]);
        }
        else{
          alert("Either task is empty or the task already exists!");
        }
        setnewTask("");
        
    }

    function handleKeyDown(event){
        if(event.key==='Enter'){
         handleClick();
        }
     }

    function handleDelete(index){
      const updatedTasks = tasks.filter((element,i)=> i!==index);
      setTasks(updatedTasks);
    }
return(
  <div>
      <h1>To-Do-List<img src={todologo}></img></h1>
      <input className="inputTask" type="text" value={newTask} placeholder="Enter a task..." onChange={handleInputChange} onKeyDown={handleKeyDown}/>
      <button className="addbtn" onClick={handleClick}>Add Task</button>
      <ol className="listcontainer">
        {tasks.map((task,index)=>
                  <li key={index}>{task}
                  <button className="deletebtn" onClick={()=>handleDelete(index)}>Delete</button>
                  </li>
                )}
      </ol>
      
  </div>
  )
}

export default Todolist