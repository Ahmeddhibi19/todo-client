"use client"
import React, {  useState,CSSProperties  } from 'react';
import Spinner from './spinner';

interface Project{
    id:number;
    name:string;
}
interface SideBarProps {
  projects: Project[];
  clickedProjectId: number | null;
  onProjectClick: (id: number) => void;
  loading:boolean
}

const SideBar = ({ projects, clickedProjectId, onProjectClick,loading }: SideBarProps) => {
  let [color, setColor] = useState("#ffffff");
  //const dispatch = useDispatch();

  const handleClick = (id: number) => {
    onProjectClick(id); // Call parent handler to update clickedProjectId
  };

  return (
    <div className="sidebar w-[250px] h-[100vh] fixed flex flex-col shadow-2xl pt-[30px] bg-todo">
      <span className="text-[35px] roboto-regular mb-10 text-center">
        All Projects
      </span>
      {
        loading?(
    <Spinner />
        ):(
          <ul>
          {projects.map((project) => (
            
              <li key={project.id}
              className={`text-[20px] w-[250px] h-[50px] roboto-medium my-2 flex justify-center items-center hover:bg-hover_button hover:text-white cursor-pointer transition ${
                project.id === clickedProjectId ? "bg-hover_button text-white" : "text-black"
              }`}
              onClick={() => handleClick(project.id)}
            >
              {project.name}
            </li>
            
            
          ))}
        </ul>
        )
      }
      
    </div>
  );
};

export default SideBar;
