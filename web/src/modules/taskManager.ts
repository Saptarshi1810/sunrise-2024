
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";


let tasks: Task[] = [...initialTasks];

// Function to initialize tasks in Redis
export async function initializeTasks() {
    try {
        const response = await fetch('/api/initTasks', {
          method: 'POST',
        });
    
        if (!response.ok) {
          throw new Error('Failed to initialize tasks');
        }
    
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error("Error initializing tasks:", error);
      }
}

export async function getAllTasks(): Promise<Task[]> {
        try {
          const response = await fetch('/api/AllTasks');
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          const tasks: Task[] = await response.json();
          return tasks;
        } catch (error) {
          console.error("Error fetching tasks:", error);
          return [];
        }
      }

      export async function getActiveTasks():  Promise<Task[]> {
        try {
          const response = await fetch('/api/ActiveTasks');
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          const tasks: Task[] = await response.json();
          return tasks;
        } catch (error) {
          console.error("Error fetching tasks:", error);
          return [];
        }
      }

export async function getCompletedTasks():  Promise<Task[]> {
    try {
      const response = await fetch('/api/CompletedTasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasks: Task[] = await response.json();
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

// utils/taskUtils.ts
export async function deleteTask(id: number): Promise<void> {
    try {
      const response = await fetch(`/api/Delete?id=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
  
      // Optionally, handle the response if needed
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

export async function createTask(title: string, description: string, persona: string, group: number): Promise<Task> {
    try {
      const response = await fetch('/api/CreateTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, persona, group }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
  
      const newTask: Task = await response.json();
      return newTask;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
// utils/taskUtils.ts
export async function updateTaskCompleted(id: number, completed: boolean): Promise<Task> {
    try {
      const response = await fetch('/api/CompleteTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completed }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      const updatedTask: Task = await response.json();
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  
 // utils/taskUtils.ts
export async function updateTask(updatedTask: Partial<Task> & { id: number }): Promise<Task> {
    try {
      const response = await fetch('/api/UpdateTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
  
      const task: Task = await response.json();
      return task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  