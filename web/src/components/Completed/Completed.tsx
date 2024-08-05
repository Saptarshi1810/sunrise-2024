import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';
import { getCompletedTasks } from '@/modules/taskManager';

interface TaskListProps {
  CompletedTasks?: Task[];
  onTaskUpdate: () => void; // Callback function
}

const CompletedList: React.FC<TaskListProps> = ({ CompletedTasks = [], onTaskUpdate }) => {
  const [tasks, setTasks] = useState<Task[]>(CompletedTasks);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const completedTasks = await getCompletedTasks();
        setTasks(completedTasks);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    }

    fetchTasks();
  }, [onTaskUpdate]); // Add `onTaskUpdate` to dependency array

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="flex flex-wrap gap-4">
      <Heading>Completed</Heading>
      {completedTasks.map(task => (
        <div key={task.id} style={{ flex: '1 1 33%', maxWidth: '50%' }}>
          <TaskCard task={task} onTaskUpdate={onTaskUpdate} />
        </div>
      ))}
    </div>
  );
};

export default CompletedList;
