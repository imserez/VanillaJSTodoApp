export default function taskCard(task, taskToggle, taskDelete, taskEdit) {
  return {
    tag: "div",
    id: task.id,
    classes: "task-card",
    children: [
      {
        tag: "div",
        classes: "left-task-div",
        children: [
          {
            tag: "form",

            children: [
              {
                tag: "input",
                type: "checkbox",
                checked: task.completed,
                events: { click: () => taskToggle(task.id) },
                //events: { click: () => toggle() },
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        classes: "mid-task-div",
        text: task.title,
      },
      {
        tag: "div",
        classes: "right-task-div",
        children: [
          {
            tag: "button",
            text: "Edit",
            events: { click: () => taskEdit(task.id) },
          },
          {
            tag: "button",
            text: "X",
            events: { click: () => taskDelete(task.id) },
          },
        ],
      },
    ],
  };
}
