import headerComponent from "./LayoutComponents/headerComponent";
import toDoConfigLayout from "../Models/toDoConfigLayout";
import createNewTaskForm from "../Components/createNewTaskForm";
import createNewFolderForm from "../Components/createNewFolderForm";

// const testLayout = [
//   { id: "1", type: "div", classes: "header-div", parent: null },
//   { id: "2", type: "div", classes: "content-div", parent: null },
//   { id: "2.1", type: "div", classes: "left-sidebar", parent: "2" },
//   { id: "2.1.1", type: "div", classes: "folders-container", parent: "2.1" },
//   { id: "2.2", type: "div", classes: "right-content", parent: "2" },
// ];

//TODO, idea: pasar los children a componente también para que children haga reutrn del array
const defaultLayout = {
  // Todo esto va a _layoutDomComponents, componentes para poder acceder a ellos y manipularlos.
  options: new toDoConfigLayout({
    renderFoldersId: "folders-container",
    renderTasksId: "tasks-container",

    renderNewTaskCreatorId: "tasks-creator",
    btnCreateNewTaskId: "create-new-task-btn",
    formCreateNewTaskId: "create-new-task-form",
    cancelCreateTaskId : "cancel-create-task",

    btnCreateNewFolderId: "create-new-folder-btn",
    renderNewFolderCreatorId: "folder-creator",
    formCreateNewFolderId : "create-new-folder-form",
    cancelCreateFolderId : "cancel-create-folder",

  }),
  layout: [
    headerComponent("To-DoApp"),
    {
      tag: "div",
      classes: "content-div",
      children: [
        {
          tag: "div",
          classes: "left-sidebar",
          children: [
            {
              tag: "div",
              classes: "folders-container",
              children: [
                {
                  tag: "div",
                  classes: "folders-title",
                  children: [
                    {
                      tag: "h2",
                      classes: "folders-section",
                      text: "Folders:",
                    },
                  ],
                },
                {
                  tag: "div",
                  id: "folders-container",
                  classes: "folders",
                  children: [],
                },
                {
                  tag: "div",
                  classes: "tasks-creator",
                  id: "folder-creator",
                  children: [
                    {
                      tag: "button",
                      id: "create-new-folder-btn",
                      classes: "create-button",
                      text: "Add a new folder",
                    },
                    createNewFolderForm(),
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: "div",
          classes: "right-content",
          children: [
            {
              tag: "div",
              classes: "tasks-container",
              id: "tasks-container",
              children: [],
            },
            {
              tag: "div",
              classes: "tasks-creator",
              id: "tasks-creator",
              children: [
                {
                  tag: "button",
                  id: "create-new-task-btn",
                  classes: "create-button",
                  text: "Add a new task",
                },
                createNewTaskForm(),
              ],
            },
          ],
        },
      ],
    },
    { tag: "div", classes: "footer-div", children: [] },
  ],
};

export default defaultLayout;
