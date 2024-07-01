"use client"
import Card from "./card";
import { FiClock } from "react-icons/fi";
import { AiOutlineCheckCircle } from 'react-icons/ai';
export type State = "done" | "doing" | "to do";
export interface Task {
    id?:number
    title: string;
    description?: string;
    status: State;
    startDate: string;
    dueDate: string;
  }


const Task = ({task}:{task:Task}) => {
    const startDate = new Date(Number(task.startDate));
  const dueDate = new Date(Number(task.dueDate));
  return (
    <Card state={task.status}>
        <span className="text-[20px] roboto-medium  ">{task.title}</span>
        <div className="w-full h-auto flex flex-row justify-start">
            {
                task.status==="doing"?(
                    <div className="w-[60px] h-[35px] bg-doing text-gray-600 rounded-md flex justify-center items-center mr-[15px]">Doing</div>
                ):(
                    task.status=="done"?(
                        <div className="w-[60px] h-[35px] bg-done text-gray-600 rounded-md flex justify-center items-center mr-[15px]">Done</div>
                    ):(
                        <div className="w-[60px] h-[35px] bg-todo text-gray-600 rounded-md flex justify-center items-center mr-[15px]">To Do</div>
                    )
                )
            }
            <div className="w-[150px] h-[35px] bg-todo text-gray-600 flex flex-row rounded-md  justify-center items-center"> 
                <FiClock className="mr-1" />
                { startDate.toLocaleDateString()}
            </div>
        </div>
        <div className="w-full h-[35px] rounded-md bg-todo text-gray-500 flex items-center pl-2">
        <AiOutlineCheckCircle size={24} className="mr-2"/>
            {dueDate.toLocaleString('en-US', { month: 'long' })} : {startDate.toLocaleString('en-US', { month: 'long' })}
         </div>

    </Card>
  )
}

export default Task;