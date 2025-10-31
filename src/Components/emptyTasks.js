export default function emptyTasks() {
  return {
    tag: "div",
    classes: "task-card",
    children: [
      {
        tag: "p",
        text: "No tasks here...",
      },
    ],
  };
}
