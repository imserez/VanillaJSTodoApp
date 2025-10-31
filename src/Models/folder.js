import Task from "./task";

export default class Folder {
  constructor({ id, title, description, color, position, defaultTask } = {}) {
    this.id = id || self.crypto.randomUUID();
    ((this.title = title),
      (this.description = description),
      (this.color = color),
      (this.position = position),
      (this.tasks = [defaultTask]));
  }

  getTasks() {
    this.return(tasks);
  }
}
