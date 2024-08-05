import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';
import { getAllTasks } from '@/modules/taskManager';

interface TaskListProps {
  initialTasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks = [] }) => {
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
  }, []);

  const incompleteTasks = tasks.filter(task => !task.isactive);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <Heading>TODO</Heading>
        {incompleteTasks.map((task, index) => (
          <div key={index} style={{ flex: '1 1 33%', maxWidth: '50%' }}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
