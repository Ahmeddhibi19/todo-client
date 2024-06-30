import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

interface Task {
  title: string;
  description: string;
  status: 'to do' | 'doing' | 'done';
  dueDate: string;
}

const AddTask= ({projectid}:{projectid:number}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<'to do' | 'doing' | 'done'>('to do');
  const [dueDate, setDueDate] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      title,
      description,
      status,
      dueDate,
    };
    console.log(newTask);

    // Clear the form fields
    setTitle('');
    setDescription('');
    setStatus('to do');
    setDueDate('');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
        <div className='w-full flex flex-row'>
        <div className='h-[30px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={`/${projectid}`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

        </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Task Title:
          </label>
          <input
            type="text"
            id="title"
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
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'to do' | 'doing' | 'done')}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="to do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
            Due Date:
          </label>
          <input
            type="date"
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
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
