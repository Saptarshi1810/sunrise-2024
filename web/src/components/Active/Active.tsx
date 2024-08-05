import React from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

const ActiveList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  const incompleteTasks = tasks.filter(task => task.isactive && !task.completed);

  return (
    <div className="flex flex-wrap gap-4">
      <Heading>Active</Heading>
      {incompleteTasks.map(task => (
        <div key={task.id}style={{ flex: '1 1 33%', maxWidth: '50%' }}>
          <TaskCard task={task} onTaskUpdate={onTaskUpdate} />
        </div>
      ))}
    </div>
  );
};

export default ActiveList;
