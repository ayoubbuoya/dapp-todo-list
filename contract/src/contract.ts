// Find all our documentation at https://docs.near.org
import { NearBindgen, Vector, near, call, view, initialize } from "near-sdk-js";

import { Task } from "./Task";

@NearBindgen({})
class ToDoList {
  tasks: Task[] = [];

  @initialize({})
  init({ tasks }: { tasks: Task[] }): void {
    this.tasks = tasks;
  }

  @view({})
  get_tasks(): Task[] {
    near.log(`Getting tasks ${JSON.stringify(this.tasks)}`);
    return this.tasks;
  }

  @call({})
  add_task({ id, content }: Task): void {
    near.log(`Adding task ${id}: ${content}`);
    const task: Task = { id, content };
    this.tasks.push(task);
  }

  @call({})
  delete_task({ id }: { id: string }): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      near.log(`Deleting task ${id}`);
      this.tasks.splice(index, 1)
    }
  }
}
