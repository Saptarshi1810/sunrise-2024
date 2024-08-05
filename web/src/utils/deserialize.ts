import Task from "@/model/Task";
const deserializeTask = (json: string): Task => {
    const obj = JSON.parse(json);
    return new Task(obj.id, obj.title, obj.description, obj.persona, obj.group, obj.completed, obj.isactive);
  };
  export default deserializeTask;