export default function headerComponent(name) {
  return {
    tag: "header",
    classes: "header-div",
    children: [
      {
        tag: "h1",
        classes: "main-title",
        text: name,
      },
      {
        tag: "div",
        classes: "header-actions",
        /*children: [
          {
            tag: "button",
            classes: "btn header-btn",
            text: "☀️",
            id: "theme-toggle-btn",
            events: {
              click: () => {
                document.body.classList.toggle("dark-mode");
              },
            },
          },
        ],*/
      },
    ],
  };
}
