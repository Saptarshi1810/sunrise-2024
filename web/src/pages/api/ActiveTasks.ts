// pages/api/fetchActiveTasks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Task from '@/model/Task';
import redis from '@/utils/redis';
import deserializeTask from '@/utils/deserialize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const keys = await redis.keys('task:*');
    const tasks: Task[] = [];

    for (const key of keys) {
      const task = await redis.get(key);
      if (task) {
        const deserializedTask = deserializeTask(JSON.stringify(task));
        if (deserializedTask.isactive) {
          tasks.push(deserializedTask);
        }
      }
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks from Redis:", error);
    res.status(500).json({ message: 'Error fetching tasks from Redis', error });
  }
}
