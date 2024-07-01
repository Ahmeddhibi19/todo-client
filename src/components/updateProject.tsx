"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateProject,fetchProjectById } from '../redux/projectReducer';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from './spinner';
import PopUp from './popUp';

interface Project {
  id: number;
  name: string;
  description: string;
}

const UpdateProject= ({ projectId }:{projectId:string}) => {
  const dispatch: AppDispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project.project);
  const condition = useSelector((state: RootState) => state.project.state);
  const error = useSelector((state: RootState) => state.project.error);
  const [color, setColor] = useState('#ffffff');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const projectid=parseInt(projectId)
    if (!isNaN(projectid)) {
      dispatch(fetchProjectById(projectid));
    }
  }, [dispatch, projectId]);

  useEffect(()=> {
    if(project){
      setName(project.name);
      setDescription(project.description)
    }
  },[project])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProject: Project = {
      id: parseInt(projectId),
      name,
      description,
    };
    dispatch(updateProject(updatedProject)).then((result)=>{
      if(updateProject.fulfilled.match(result)){
        setNotification({ message: 'Project updated successfully!', type: 'success' });
      }else if(updateProject.rejected.match(result)){
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
          <Link href={`/`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">update Project With id :{projectId}</h2>

        </div>
        {notification && (
        <PopUp message={notification.message} type={notification.type} />

      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Project Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Project Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-hover_button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
