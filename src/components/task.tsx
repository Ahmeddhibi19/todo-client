"use client"
import Card from "./card";
import { FiClock } from "react-icons/fi";
import { AiOutlineCheckCircle } from 'react-icons/ai';
export type State = "done" | "doing" | "to-do";
export interface task{
    id:number
    title:string;
    description?:string;
    status:State
    startdate:Date;
    dueDate:Date
}


const Task = ({task}:{task:task}) => {
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
                        <div className="w-[60px] h-[35px] bg-todo text-gray-600 rounded-md flex justify-center items-center mr-[15px]">Done</div>
                    )
                )
            }
            <div className="w-[150px] h-[35px] bg-todo text-gray-600 flex flex-row rounded-md  justify-center items-center"> 
                <FiClock className="mr-1" />
                {task.startdate.toLocaleDateString()}
            </div>
        </div>
        <div className="w-full h-[35px] rounded-md bg-todo text-gray-500 flex items-center pl-2">
        <AiOutlineCheckCircle size={24} className="mr-2"/>
            {task.dueDate.toLocaleString('en-US', { month: 'long' })} : {task.startdate.toLocaleString('en-US', { month: 'long' })}
         </div>

    </Card>
  )
}

export default Task;