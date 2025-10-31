export default function editTaskCard(
  parentTaskId,
  discardChanges,
  saveChanges
) {
  return {
    tag: "div",
    id: "edit" + parentTaskId.id,
    classes: "task-creator-card",
    children: [
      {
        tag: "form",
        classes: "task-editor-form",
        onSubmit: (e) => {
          e.preventDefault();
          saveChanges(e, parentTaskId);
        },
        children: [
          {
            tag: "p",
            children: [
              {
                tag: "label",
                for: "task-name",
                text: "Task Name:",
                htmlFor: "teditname",
              },
              {
                tag: "input",
                type: "text",
                classes: "mid-task-div",
                defaultValue: parentTaskId.title,
                id: "teditname",
                name: "tditname",
              },
            ],
          },
          {
            tag: "div",
            classes: "task-creator-buttons",
            children: [
              {
                tag: "button",
                text: "Save",
                type: "submit",
                classes: "save-changes-btn btn",
                // events: { click: () => saveChanges(parentTaskId.id) },
              },
              {
                tag: "button",
                text: "Discard",
                type: "button",
                classes: "discard-changes-btn btn",
                events: { click: () => discardChanges(parentTaskId.id) },
              },
            ],
          },
        ],
      },
    ],
  };
}
