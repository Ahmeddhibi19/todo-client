"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TaskType, updateTask } from '@/redux/tasksSlice';
import  { task } from './task';
import { State } from './task';
import { TaskResult } from '@reduxjs/toolkit';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {
    taskid: number;
}

const UpdateTask:React.FC<Props> = ({taskid}) => {
    const dispatch=useDispatch();
    const task=useSelector((state:RootState)=>state.tasks.task);
    const[title,setTitle]=useState<string>("")
    const[description,setDescription]=useState<string| undefined>("")
    const[status,setStatus]=useState<State>('to-do')
    const[startdate,setStartDate]=useState<Date>(new Date())
    const[dueDate,setDueDate]=useState<Date>(new Date());

    useEffect(() => {
        // Fetch project data based on projectId (You may replace this with an API call)
        if (taskid && task) {
            setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
          setStartDate(task.startdate);
          setDueDate(task.dueDate);
        }
      }, []);
      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const updatedTask:TaskType = {
          id: taskid,
          title,
          description,
          startdate,
          status,
          dueDate
        };
        dispatch(updateTask(updatedTask));
      };

  return (
    <div className="max-w-md mx-auto mt-10">
    <div className='w-full flex flex-row'>
        <div className='h-[30px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={`/`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">update task With id :{taskid}</h2>

        </div>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Task Title:
        </label>
        <input
          type="text"
          id="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Task Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
          Task status:
        </label>
        <select
         name="status"
          id="status"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"           value={status}
           onChange={(e)=>setStatus(e.target.value as State)}
           >
            <option value="">choose</option>
            <option value="to-do">to do</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
        
      </div>
      <div className="mb-4">
        <label htmlFor="startdate" className="block text-gray-700 text-sm font-bold mb-2">
          Start Date:
        </label>
        <input
          type='date'
          id="startdate "
          value={startdate.toLocaleDateString()}
          onChange={(e) => setStartDate(new Date(e.target.value ))}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
         Due Date:
        </label>
        <input
          type='date'
          id="dueDate "
          value={startdate.toLocaleDateString()}
          onChange={(e) => setDueDate(new Date(e.target.value ))}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Project
        </button>
      </div>
    </form>
  </div>
);
};

export default UpdateTask