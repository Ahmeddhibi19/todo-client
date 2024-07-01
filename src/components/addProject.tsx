"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from './spinner';
import PopUp from './popUp';
import { createProject } from '@/redux/projectReducer';


interface Project {
  name: string;
  description: string;
}



const AddProject: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const condition = useSelector((state: RootState) => state.project.state);
  const error = useSelector((state: RootState) => state.project.error);
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);



  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();

   const newProject:Project={
    name: projectName,
    description: projectDescription,
   }
   dispatch(createProject(newProject)).then((result) => {
    if (createProject.fulfilled.match(result)) {
      setNotification({ message: 'Project created successfully!', type: 'success' });
    } else if (createProject.rejected.match(result)) {
      setNotification({ message: `Error: ${result.payload}`, type: 'error' });
    }
  })
  .then(res=>{
    setProjectDescription('')
    setProjectName('')
  })
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
          <Link href={`/`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        </div>
        {notification && (
         <PopUp message={notification.message} type={notification.type} />

      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Project Description:
          </label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
        <button
            type="submit"
            className="bg-blue-900 hover:bg-hover_button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;