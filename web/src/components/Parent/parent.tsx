import React, { useState } from 'react';
import TaskList from '../Todo/TodoSection';
import CompletedList from '../Completed/Completed';
import ActiveList from '../Active/Active';
import { useFetchTasks } from '@/hooks/useFetchTasks';

export default function Parent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { activeTasks, completedTasks, allTasks } = useFetchTasks(refreshKey);

  const handleTaskUpdate = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div>
      <div className="flex flex-wrap -mx-2 w-full">
        <div className="w-full md:w-1/3 px-5">
          <TaskList initialTasks={allTasks} onTaskUpdate={handleTaskUpdate} />
        </div>
        <div className="w-full md:w-1/3 px-5">
          <ActiveList tasks={activeTasks} onTaskUpdate={handleTaskUpdate} />
        </div>
        <div className="w-full md:w-1/3 px-5">
          <CompletedList  onTaskUpdate={handleTaskUpdate} />
        </div>
      </div>
    </div>
  );
}
