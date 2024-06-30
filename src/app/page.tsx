"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useQuery,useMutation } from '@apollo/client';
import Link from 'next/link';
import { FaPen } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { fetchProjectsStart, fetchProjectsSuccess, fetchProjectsFailure, selectProjects } from '@/redux/projectsArraySlice';
import { RootState } from '../redux/store';
import SideBar from '@/components/sideBar';
import { GET_PROJECTS, DELETE_PROJECT } from '@/apollo/requests'


const Home = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => selectProjects(state));
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [clickedProjectId, setClickedProjectId] = useState<number | null>(null); // Initialize with null
  const [deleteProject]=useMutation(DELETE_PROJECT)
  const [res,setRes]=useState()

  useEffect(() => {
    dispatch(fetchProjectsStart());

    if (error) {
      dispatch(fetchProjectsFailure(error.message));
    } else if (data) {
      dispatch(fetchProjectsSuccess(data.getProjects));

      // Set the clickedProjectId to the ID of the first project if data is available
      if (data.getProjects.length > 0) {
        setClickedProjectId(data.getProjects[0].id);
      }
    }
  }, [loading, error, data, dispatch]);

 

  const handleProjectClick = (id: number) => {
    setClickedProjectId(id);
  };
  const handleDeleteProject= async (id:number)=>{
    try {
      const { data } = await deleteProject({
        variables: {
          deleteProjectId: id,
        },
        refetchQueries: [{ query: GET_PROJECTS }],
      });
      setRes(data);
      console.log(res)
  }catch (error) {
  console.error('Failed to delete project:', error);
}
};
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
  return (
    <main>
      <div className="flex">
        <SideBar projects={projects} onProjectClick={handleProjectClick} clickedProjectId={clickedProjectId} />

        <div className="ml-[250px] pl-[20px] h-[100vh] flex flex-col justify-start pt-[50px]">
          {clickedProjectId !== null && (
            <div className="flex items-start flex-col">
              <div className="w-[900px] flex flex-row items-start justify-between ">
                <div className='w-[70%] flex flex-row overflow-x-auto justify-between'>
                <h2 className="text-[65px] roboto-regular mb-16">{projects.find(project => project.id === clickedProjectId)?.name}</h2>
                <Link href={`/updateProject/${clickedProjectId}`}>
                  <FaPen size={36} className="mt-8 cursor-pointer" title="Update project details" />
                </Link>
                </div>
               
                <AiOutlineCloseCircle size={35} className="mt-[35px] text-red-500 cursor-pointer" title="Delete this project" onClick={()=>handleDeleteProject(clickedProjectId)}/>
              </div>

              <div className="w-[950px] h-auto bg-todo py-[15px] pl-[10px] rounded-lg mb-20">
                <p className="text-[20px]">{projects.find(project => project.id === clickedProjectId)?.description}</p>
              </div>

              <div className="w-[800px] flex justify-between">
                <Link href={`/${clickedProjectId}`}>
                  <div className="bg-hover_button w-[150px] h-[50px] p-2 flex items-center justify-center text-white font-bold rounded-lg shadow-lg shadow-gray-500 hover:text-hover_button hover:bg-todo hover:shadow-none transition">
                    Associated tasks
                  </div>
                </Link>
                <Link href="/addProject">
                  <div className="w-[150px] h-[50px] p-2 flex items-center justify-center bg-todo font-bold rounded-lg shadow-lg shadow-gray-200 text-hover_button">
                    Add project
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;

