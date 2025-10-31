
export default function folderCard(folder, callback, deleteFolder) {
  if (folder.id === "inbox-folder")
  {
    return {
      tag: "div",
      id: folder.id,
      classes: "folder-card",
      events: { click: () => callback(folder.id) },
      children: [
        {
          tag: "div",
          classes: "mid-task-div",
          text: folder.title,

        },
        {
          tag: "div",
          classes: "right-task-div",
          children: [],
        },
      ],
    };
  }
  else {
       return {
    tag: "div",
    id: folder.id,
    classes: "folder-card",
    events: { click: () => callback(folder.id) },
    children: [
      {
        tag: "div",
        classes: "mid-task-div",
        text: folder.title,

      },
      {
        tag: "div",
        classes: "right-task-div",
        children: [
          {
            tag: "button",
            text: "X",
            events: {
                click: (e) => {
                  if (e && typeof e.stopPropagation === "function") e.stopPropagation();
                  deleteFolder(folder.id);
                },
            },
          },
        ],
      },
    ],
  };
  }

}

