import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';
import { getAllTasks } from '@/modules/taskManager';

interface TaskListProps {
  initialTasks?: Task[];
  onTaskUpdate: () => void; // Callback function
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks = [], onTaskUpdate }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const allTasks = await getAllTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [onTaskUpdate]); // Add `onTaskUpdate` to dependency array

  const incompleteTasks = tasks.filter(task => !task.isactive);

  return (
    <div className="flex flex-wrap gap-4">
      <Heading>TODO</Heading>
      {incompleteTasks.map(task => (
        <div key={task.id} style={{ flex: '1 1 33%', maxWidth: '50%' }}>
          <TaskCard task={task} onTaskUpdate={onTaskUpdate} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
