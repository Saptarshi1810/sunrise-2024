import React from 'react';
import Header from '@/components/Header';
import TaskList from '@/components/Todo/TodoSection';
import { initialTasks } from '@/utils/TaskList';
import ActiveList from '@/components/Active/Active';
import CompletedList from '@/components/Completed/Completed';

export default function Home() {
    return (
<div>
    <Header></Header>
    <div className="flex flex-wrap -mx-2 w-full">
      <div className="w-full md:w-1/3 px-5">
        <TaskList tasks={initialTasks} />
      </div>
      <div className="w-full md:w-1/3 px-5">
        <ActiveList tasks={initialTasks} />
      </div>
      <div className="w-full md:w-1/3 px-5">
        <CompletedList tasks={initialTasks} />
      </div>
    </div>
</div>
    )
  }

