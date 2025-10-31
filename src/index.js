import createDomController from "./Controllers/domController.js";
import createFolderController from "./Controllers/folderController.js";
import localStorageController from "./Controllers/localStorageController.js";
import defaultLayout from "./Layouts/defaultLayout.js";
import Folder from "./Models/folder.js";
import Task from "./Models/task.js";
import { toDoLayoutDependencies } from "./Models/toDoConfigLayout.js";

import "./styles/globals.css";
import "./styles/modal.css";

document.addEventListener("DOMContentLoaded", () => app());

// todo, como le paso a una folder que se pueda
// hacer clic y activarse...?
// LayoutCOntroller probablemente ya no tenga sentido en este contexto.

let tasks = [];
let selectedFolder;
let folders = [];
let domCtrlRef = null;
let inboxFolder = null;

function changeSelectedFolder(folderId) {
  let newFolder = folders.find((fol) => fol.id == folderId);
  selectedFolder = newFolder;
  domCtrlRef.setCurrentFolder(selectedFolder);
  selectFolderTasks();
  createNewTask(false);
}

function selectFolderTasks() {
  tasks = selectedFolder.tasks;
  domCtrlRef.renderTasks(tasks);
}

function createNewTask(display) {
  domCtrlRef.displayCreateNewTaskForm(display);
  // domCtrlRef.renderCreateTaskModal();
}

function createNewFolder(display) {
  domCtrlRef.displayCreateNewFolderForm(display);
  // domCtrlRef.renderCreateTaskModal();
}

function toggleTask(id) {
  const updatedTasks = tasks.map((t) => {
    if (t.id === id) {
      return {
        ...t,
        completed: !t.completed,
      };
    }
    return t;
  });
  tasks = updatedTasks;
  selectedFolder.tasks = updatedTasks;
  localStorageController.updateTasks(updatedTasks, selectedFolder, folders);
  domCtrlRef.toggleTask(id);
}


function folderDelete(id) {
  const updatedFolders = folders.filter((f) => f.id !== id);
  folders = updatedFolders;

  // console.log(selectedFolder)
  if (selectedFolder.id === id)
  {
      changeSelectedFolder (inboxFolder.id);
  }
  localStorageController.saveFoldersInStorage(updatedFolders);
  domCtrlRef.renderFolders(updatedFolders);
  domCtrlRef.setCurrentFolder(selectedFolder);
}

function deleteTask(id) {
  const updatedTasks = tasks.filter((t) => t.id !== id);
  tasks = updatedTasks;
  selectedFolder.tasks = updatedTasks;
  localStorageController.updateTasks(updatedTasks, selectedFolder, folders);
  domCtrlRef.renderTasks(tasks);
}

function handleSubmitCreateNewFolder(e) {
  let folderName = e.target.fname.value;

  let createFolder = new Folder({title: folderName});

  localStorageController.addCreatedFolder(createFolder, folders);

  // To render tasks
  folders.push(createFolder);
  // Render tasks again.
  domCtrlRef.renderFolders(folders);
  domCtrlRef.setCurrentFolder(selectedFolder);

  e.preventDefault();
  // Return to display the button
  domCtrlRef.displayCreateNewFolderForm(false);
}


function handleSubmitCreateNewTask(e) {
  let taskName = e.target.tname.value;
  // let dueDate = e.target.tduedate.value;
  let dueDate = null;

  let createTask = new Task(taskName, "", dueDate, 0, "", false);

  localStorageController.addCreatedTask(createTask, selectedFolder, folders);
  // To render tasks
  if (tasks[0] == null) tasks[0] = createTask;
  else tasks.push(createTask);
  // Render tasks again.
  domCtrlRef.renderTasks(tasks);
  e.preventDefault();
  // Return to display the button
  domCtrlRef.displayCreateNewTaskForm(false);
}

function saveChanges(e, parentTaskId) {
  const newTitle = e.target.teditname.value;
  const updatedTasks = tasks.map((t) => {
    if (t.id === parentTaskId.id) {
      return {
        ...t,
        title: newTitle,
      };
    }
    return t;
  });
  tasks = updatedTasks;

  selectedFolder.tasks = updatedTasks;
  domCtrlRef.renderTasks(updatedTasks);
  localStorageController.updateTasks(updatedTasks, selectedFolder, folders);
}
function discardChanges(id) {
  domCtrlRef.closeEditingMode(id);
}

function editTask(id) {
  let taskToEdit = tasks.find((tsk) => tsk.id === id);
  domCtrlRef.displayEditTaskMode(taskToEdit);
}

function app() {
  const domCtrl = createDomController();
  const folderCtrl = createFolderController();
  domCtrlRef = domCtrl;

  // Step 1: Define your layout.
  domCtrl.changeLayout(defaultLayout);
  // Step 2: Assign Layout dependencies.
  // [ ElementId, { event: action } ]

  let layoutDependencies = new toDoLayoutDependencies({
    btnCreateNewTaskAction: ["click", () => createNewTask(true)],
    formCreateNewTaskAction: ["submit", handleSubmitCreateNewTask],
    folderClickAction: ["none", changeSelectedFolder],
    taskToggleAction: ["none", toggleTask],
    taskDeleteAction: ["none", deleteTask],
    taskEditAction: ["none", editTask],
    taskSaveChangesAction: ["none", saveChanges],
    taskDiscardChangesAction: ["none", discardChanges],
    btnCreateNewFolderAction: ["click", () => createNewFolder(true)],
    formCreateNewFolderAction: ["submit", handleSubmitCreateNewFolder],
    cancelCreateFolderAction: ["click", () => createNewFolder(false)],
      cancelCreateTaskAction: ["click", () => createNewTask(false)],
      folderDeleteAction: ["none", folderDelete]
  });

  domCtrl.assignLayoutDependencies(layoutDependencies);

  folders = folderCtrl.loadFolders();
  selectedFolder = folderCtrl.getInboxFolder(folders);
  inboxFolder = selectedFolder;
  domCtrl.renderFolders(folders);
  selectFolderTasks();

  domCtrl.setCurrentFolder(selectedFolder);

  domCtrl.renderTasks(tasks, selectedFolder);
  //mainPage({ state });
}
