// pages/api/updateTask.ts
import { NextApiRequest, NextApiResponse } from 'next';

import redis from '@/utils/redis';
import deserializeTask from '@/utils/deserialize';

// Define the type of the request body
interface UpdateRequestBody {
  id: number;
  title?: string;
  description?: string;
  persona?: string;
  group?: number;
  completed?: boolean;
  isactive?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Parse the request body
    const { id, title, description, persona, group, completed, isactive }: UpdateRequestBody = req.body;

    // Retrieve the task from Redis
    const taskString = await redis.get(`task:${id}`);
    if (!taskString) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Deserialize the task
    const task = deserializeTask(JSON.stringify(taskString));

    // Update the task properties
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (persona !== undefined) task.persona = persona;
    if (group !== undefined) task.group = group;
    if (completed !== undefined) task.completed = completed;
    if (isactive !== undefined) task.isactive = isactive;

    // Save the updated task back to Redis
    await redis.set(`task:${id}`, JSON.stringify(task));

    // Respond with the updated task
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: 'Error updating task', error });
  }
}
