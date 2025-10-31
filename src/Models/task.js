export default class Task {
  constructor(
    title,
    description,
    dueDate,
    priority = 0,
    notes,
    completed = false,
  ) {
    this.id = self.crypto.randomUUID();
    ((this.title = title),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.notes = notes));
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
