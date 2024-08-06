// pages/api/initTasks.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { initialTasks } from '@/utils/TaskList';
import redis from '@/utils/redis';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Store each task in Redis with a unique key
    for (const task of initialTasks) {
      await redis.set(`task:${task.id}`, JSON.stringify(task));
    }
    res.status(200).json({ message: 'Tasks initialized in Redis' });
  } catch (error) {
    console.error("Error initializing tasks in Redis:", error);
    res.status(500).json({ message: 'Error initializing tasks in Redis', error });
  }
}
