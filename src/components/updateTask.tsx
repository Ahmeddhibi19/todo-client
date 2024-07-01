"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { TaskType, updateTask, fetchTaskById } from '@/redux/tasksSlice';
import { State } from './task';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PopUp from './popUp';
import Spinner from './spinner';

const UpdateTask = ({ taskId }: { taskId: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const task = useSelector((state: RootState) => state.tasks.task);
  const condition = useSelector((state: RootState) => state.tasks.state);
  const error = useSelector((state: RootState) => state.tasks.error);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [status, setStatus] = useState<State>('to do');
  const [startDate, setStartDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [projectId, setProjectId] = useState<number | undefined>(undefined);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const taskid = parseInt(taskId);
    if (!isNaN(taskid)) {
      dispatch(fetchTaskById(taskid));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setStartDate(formatDateString(task.startDate));
      setDueDate(formatDateString(task.dueDate));
      setProjectId(task.projectId);
    }
  }, [task]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTask: TaskType = {
      id: parseInt(taskId),
      title,
      description,
      status,
      startDate,
      dueDate,
      projectId: projectId as number,
    };
    dispatch(updateTask(updatedTask)).then((result) => {
      if (updateTask.fulfilled.match(result)) {
        setNotification({ message: 'Task updated successfully!', type: 'success' });
      } else if (updateTask.rejected.match(result)) {
        setNotification({ message: `Error: ${result.payload}`, type: 'error' });
      }
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (condition === 'loading') {
    return (
      <Spinner />
    );
  }

  if (condition === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className='w-full flex flex-row'>
        <div className='h-[30px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={`/`} className='text-center'><FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Update Task with ID: {taskId}</h2>
      </div>
      {notification && (
         <PopUp message={notification.message} type={notification.type} />

      )}
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
            Task Status:
          </label>
          <select
            name="status"
            id="status"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={status}
            onChange={(e) => setStatus(e.target.value as State)}
          >
            <option value="">Choose</option>
            <option value="to do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date:
          </label>
          <input
            type='date'
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-hover_button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Task
          </button>
        </div>
      </form>
     
    </div>
  );
};

export default UpdateTask;

const formatDateString = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
