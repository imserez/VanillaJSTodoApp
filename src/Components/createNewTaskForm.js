export default function createNewTaskForm() {
  return {
    tag: "div",
    classes: "task-create-wrapper",
    children: [
      {
        tag: "form",
        classes: "task-create-form hidden", // 👈 se muestra/oculta dinámicamente
        id: "create-new-task-form",
        onSubmit: (e) => {
          e.preventDefault();
          // aquí iría tu lógica para crear la nueva tarea
        },
        children: [
          {
            tag: "div",
            classes: "form-group",
            children: [
              {
                tag: "label",
                for: "tname",
                text: "Task Name:",
                htmlFor: "tname",
                classes: "form-label",
              },
              {
                tag: "input",
                type: "text",
                id: "tname",
                name: "tname",
                classes: "form-input",
                placeholder: "Enter task title...",
                required: true,
              },
            ],
          },
          {
            tag: "div",
            classes: "form-actions",
            children: [
              {
                tag: "button",
                type: "submit",
                text: "Add Task",
                classes: "btn btn-add",
              },
              {
                tag: "button",
                type: "button",
                text: "Cancel",
                classes: "btn btn-cancel",
                id: "cancel-create-task",
              },
            ],
          },
        ],
      },
    ],
  };
}
