"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { setCondition, fetchTasksByProjectId } from '@/redux/tasksSlice';
import Task from '@/components/task';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

type State = "done" | "doing" | "to do";

interface TaskType {
  id?: number;
  title: string;
  description?: string;
  status: State;
  startDate: string;
  dueDate: string;
}

const Page = ({ params }: { params: { projectid: string } }) => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const condition = useSelector((state: RootState) => state.tasks.condition);
  const status = useSelector((state: RootState) => state.tasks.state);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    const projectId = parseInt(params.projectid);
    if (!isNaN(projectId)) {
      dispatch(fetchTasksByProjectId(projectId));
    }
  }, [dispatch, params.projectid]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const currentMonthIndex = new Date().getMonth();
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en-US', { month: 'long' })).slice(currentMonthIndex);

  const tasksByMonth = months.reduce((acc, month) => {
    acc[month] = tasks.filter(task => {
      const dueDate = new Date(Number(task.dueDate));
      return dueDate.toLocaleString('en-US', { month: 'long' }) === month;
    }).length;
    return acc;
  }, {} as { [key: string]: number });

  const filteredTasks = tasks.filter(task => {
    const dueDate = new Date(Number(task.dueDate));
    if (condition === 'status') {
      return true;
    } else if (condition.includes('status-')) {
      const month = condition.split('-')[1];
      return dueDate.toLocaleString('en-US', { month: 'long' }) === month;
    }
    return false;
  });

  const groupedTasks = filteredTasks.reduce<{ [key in State]: TaskType[] }>((acc, task) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, { "to do": [], "doing": [], "done": [] });

  const renderSummaryLine = () => {
    if (condition === 'status') {
      const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
      return (
        <h2 className="text-base font-normal mb-2">
          {currentMonth}: {tasksByMonth[currentMonth]}
        </h2>
      );
    } else if (condition.includes('status-')) {
      const selectedMonth = condition.split('-')[1];
      return (
        <h2 className="text-base font-normal mb-2">
          {selectedMonth}: {tasksByMonth[selectedMonth]}
        </h2>
      );
    }
    return null;
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCondition = e.target.value;
    dispatch(setCondition(selectedCondition));
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-center mt-10 pl-16">
      <div className="flex flex-row mb-4 ">
        <div className='h-[50px] w-[50px] flex items-center justify-center mr-10 bg-todo rounded-md '>
          <Link href={'/'} className='text-center'> <FaArrowLeft size={18} /></Link>
        </div>

        <span className="text-[35px] roboto-regular mr-4">To do List - {new Date().toLocaleString('en-US', { month: 'long' })}  </span>
        <select
          name="groupingCondition"
          id="groupingCondition"
          className="rounded-md border-2 w-[500px]"
          value={condition}
          onChange={handleConditionChange}
        >
          <option value="">Select</option>
          <option value="status">Grouping condition: Status</option>
          {months.map((month, index) => (
            <option key={index} value={`status-${month}`}>
              Grouping condition: Status and {month}
            </option>
          ))}
        </select>
        <Link href={`/${params.projectid}/addTask`}>
          <div className='h-[50px] w-[50px] text-[40px] flex items-center justify-center mr-10 bg-todo rounded-md ml-16 text-gray-400 cursor-pointer ' title='add task'>
            +
          </div>
        </Link>
      </div>

      {renderSummaryLine()}

      {condition === 'status' && (
        <div className="w-full h-auto grid grid-cols-3 gap-4 mb-4">
          {(Object.keys(groupedTasks) as State[]).map(status => (
            <div key={status} className="flex flex-col items-start bg-todo p-3 rounded-lg">
              <h2 className="text-xl font-bold mb-2">{status.toUpperCase()} ({groupedTasks[status].length})</h2>
              {groupedTasks[status].map((task, index) => (
                <Link href={`/updateTask/${task.id}`} key={index}>
                  <Task task={task} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}

      {condition.includes('status-') && (
        <div className="w-full h-auto grid grid-cols-3 gap-4 mb-4">
          {(Object.keys(groupedTasks) as State[]).map(status => (
            <div key={status} className="flex flex-col items-start bg-todo p-3 rounded-lg">
              <h2 className="text-xl font-bold mb-2">{status.toUpperCase()} ({groupedTasks[status].length})</h2>
              {groupedTasks[status].map((task, index) => (
                <Link href={`/updateTask/${task.id}`} key={index}>
                  <Task task={task} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
