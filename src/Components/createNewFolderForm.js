export default function createNewFolderForm() {
  return {
    tag: "div",
    classes: "task-create-wrapper",
    children: [
      {
        tag: "form",
        classes: "task-create-form hidden", // 👈 se muestra/oculta dinámicamente
        id: "create-new-folder-form",
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
                for: "fname",
                text: "Folder Name:",
                htmlFor: "fname",
                classes: "form-label",
              },
              {
                tag: "input",
                type: "text",
                id: "fname",
                name: "fname",
                classes: "form-input",
                placeholder: "Enter folder title...",
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
                text: "Add Folder",
                classes: "btn btn-add",
              },
              {
                tag: "button",
                type: "button",
                text: "Cancel",
                classes: "btn btn-cancel",
                id: "cancel-create-folder",
              },
            ],
          },
        ],
      },
    ],
  };
}
