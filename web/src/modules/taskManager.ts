
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

/*
export function getActiveTasks(): Task[] {

}

export function getCompletedTasks(): Task[] {
 
}

export function getAllTasks(): Task[] {
 
}

export function completeTask(taskTitle: string): void {
  
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
 
}

export function deleteTask(taskId: number): void {
 
}
*/