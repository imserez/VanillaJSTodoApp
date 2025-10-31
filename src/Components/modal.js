export default function modal() {
  return {
    tag: "div",
    classes: "modal",
    children: [
      {
        tag: "div",
        classes: "modal-content",
        children: [
          {
            tag: "span",
            classes: "close",
          },
          {
            tag: "p",
            text: "test",
          },
        ],
      },
    ],
  };
}
