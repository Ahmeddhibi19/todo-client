"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProject } from '../redux/projectReducer';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Props {
  projectId: number;
}

const UpdateProject: React.FC<Props> = ({ projectId }) => {
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.project.project);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // Fetch project data based on projectId (You may replace this with an API call)
    if (projectId && project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [projectId, project]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedProject: Project = {
      id: projectId,
      name,
      description,
    };
    dispatch(updateProject(updatedProject));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
         <div className='w-full flex flex-row'>
        <div className='h-[30px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={`/`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">update Project With id :{projectId}</h2>

        </div>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
