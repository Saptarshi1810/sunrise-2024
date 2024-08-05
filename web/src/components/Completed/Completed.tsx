import React, { useEffect, useState } from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';
import { getCompletedTasks } from '@/modules/taskManager';

interface TaskListProps {
  CompletedTasks?: Task[];
}

const CompletedList: React.FC<TaskListProps> = ({ CompletedTasks = [] }) => {
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
  }, []);

  const incompleteTasks = tasks.filter(task => task.completed);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        <Heading>Completed</Heading>
        {incompleteTasks.map((task, index) => (
          <div key={index} style={{ flex: '1 1 33%', maxWidth: '50%' }}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompletedList;
