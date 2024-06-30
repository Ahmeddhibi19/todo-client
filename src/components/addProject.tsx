import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useMutation, gql } from '@apollo/client';
import { CREATE_PROJECT } from '@/apollo/requests';

interface Project {
  name: string;
  description: string;
}



const AddProject: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await createProject({
        variables: {
          input: {
            name: projectName,
            description: projectDescription,
          },
        },
      });

      console.log('Created Project:', data.createProject);

      // Clear the form fields after successful creation
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
     <div className='w-full flex flex-row'>
        <div className='h-[30px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={`/`} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        </div>
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
            disabled={loading}
          >
            {loading ? 'Adding Project...' : 'Add Project'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default AddProject;