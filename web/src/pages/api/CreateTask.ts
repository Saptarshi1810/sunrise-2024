// pages/api/createTask.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Task from '@/model/Task';
import redis from '@/utils/redis';

// Define the type of the request body
interface CreateRequestBody {
  title: string;
  description: string;
  persona: string;
  group: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Parse the request body
    const { title, description, persona, group }: CreateRequestBody = req.body;

    // Generate a new ID (this can be improved with a more robust ID generation strategy)
    const id = Date.now(); // For example, using timestamp as a simple unique ID

    // Create a new Task object
    const newTask = new Task(id, title, description, persona, group, false, true);

    // Save the task to Redis
    await redis.set(`task:${id}`, JSON.stringify(newTask));

    // Respond with the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: 'Error creating task', error });
  }
}
