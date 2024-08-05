import React from 'react';
import TaskCard from '@/components/Todo/TodoCard';
import Task from '@/model/Task';
import { Heading } from '../Header/Heading';


interface TaskListProps {
  tasks: Task[];
 
}

const CompletedList: React.FC<TaskListProps> = ({ tasks }) => {
    const incompleteTasks = tasks.filter(task => task.completed);
    return (<>
        <div style={{ display: 'flex', flexWrap: 'wrap',gap:"4px" }}>
        <Heading>Completed</Heading>
          {incompleteTasks.map((task, index) => (
            <div key={index} style={{ flex: '1 1 33%',maxWidth:"50%" }}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
        </>
      );
    };

export default CompletedList;
