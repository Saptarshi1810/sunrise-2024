// pages/api/deleteTask.ts
import { NextApiRequest, NextApiResponse } from 'next';
import redis from '@/utils/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Extract task ID from the query string
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    // Check if the task exists
    const taskString = await redis.get(`task:${id}`);
    if (!taskString) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete the task from Redis
    await redis.del(`task:${id}`);

    // Respond with a success message
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
}
