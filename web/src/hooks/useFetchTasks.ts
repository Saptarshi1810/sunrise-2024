import { useEffect, useState } from 'react';
import Task from '@/model/Task';
import { getActiveTasks, getCompletedTasks, getAllTasks } from '@/modules/taskManager';

export function useFetchTasks(refreshKey: number) {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);

      try {
        const [activeTasksData, completedTasksData, allTasksData] = await Promise.all([
          getActiveTasks(),
          getCompletedTasks(),
          getAllTasks(),
        ]);

        setActiveTasks(activeTasksData);
        setCompletedTasks(completedTasksData);
        setAllTasks(allTasksData);
      } catch (error) {
        setError("Error fetching tasks: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [refreshKey]);

  return {
    activeTasks,
    completedTasks,
    allTasks,
    loading,
    error,
  };
}
