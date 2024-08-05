import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Task from '@/model/Task';
import Checkbox from '@mui/material/Checkbox';



interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2,height:"10.0rem",borderRadius: '8px' }}>
      <CardHeader  avatar={
          <Checkbox
          disabled={!task.isactive}/>
        }
        title={task.id+". "+task.title}
        subheader={`Group ID: ${task.group}`}
        sx={{ paddingBottom: 0 }}
        >
      </CardHeader>
      <CardContent> 
      <Typography color="textSecondary" fontSize="1 rem">
          {"Task assigned to "+task.persona}
        </Typography>
        <Typography color="textSecondary" fontSize="0.8rem">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
