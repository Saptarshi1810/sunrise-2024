import React from 'react';
import { Card, CardContent, Typography, Checkbox } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Task from '@/model/Task';
import { updateTaskCompleted } from '@/modules/taskManager'; // Updated import path

interface TaskCardProps {
  task: Task;
  onTaskUpdate: () => void; // Callback function
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdate }) => {
  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const completed = event.target.checked;
      await updateTaskCompleted(task.id, completed);
      onTaskUpdate(); // Notify parent to refresh
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, height: "10rem", borderRadius: 2 }}>
      <CardHeader
        avatar={
          <Checkbox
            checked={task.completed}
            onChange={handleCheckboxChange}
            disabled={!task.isactive}
          />
        }
        title={`${task.id}. ${task.title}`}
        subheader={`Group ID: ${task.group}`}
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <Typography color="textSecondary" fontSize="1rem">
          {`Task assigned to ${task.persona}`}
        </Typography>
        <Typography color="textSecondary" fontSize="0.8rem">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
