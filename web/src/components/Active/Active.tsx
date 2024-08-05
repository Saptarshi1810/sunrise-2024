import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';
import { getActiveTasks } from '@/modules/taskManager';

interface TaskListProps {
  ActiveTasks?: Task[];
}

const ActiveList: React.FC<TaskListProps> = ({ ActiveTasks = [] }) => {
  const [tasks, setTasks] = useState<Task[]>(ActiveTasks);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const activeTasks = await getActiveTasks();
        setTasks(activeTasks);
      } catch (error) {
        console.error("Error fetching active tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const incompleteTasks = tasks.filter(task => task.isactive && !task.completed);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <Heading>Active</Heading>
        {incompleteTasks.map((task, index) => (
          <div key={index} style={{ flex: '1 1 33%', maxWidth: '50%' }}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveList;
