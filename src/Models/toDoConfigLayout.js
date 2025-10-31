export default class toDoConfigLayout {
  constructor({
    renderFoldersId,
    renderTasksId,
    renderNewTaskCreatorId,
    btnCreateNewTaskId,
    formCreateNewTaskId,
    formCreateNewFolderId,
    btnCreateNewFolderId,
    renderNewFolderCreatorId,
    cancelCreateFolderId,
    cancelCreateTaskId
  } = {}) {
    this.renderFoldersContainer = renderFoldersId;
    this.renderTasksContainer = renderTasksId;

    this.renderNewTaskCreatorContainer = renderNewTaskCreatorId;
    this.btnCreateNewTask = btnCreateNewTaskId;
    this.formCreateNewTask = formCreateNewTaskId;

    this.formCreateNewFolder = formCreateNewFolderId;
    this.btnCreateNewFolder = btnCreateNewFolderId;
    this.renderNewFolderCreator = renderNewFolderCreatorId;
    this.cancelCreateFolder = cancelCreateFolderId;
    this.cancelCreateTask = cancelCreateTaskId;
  }
}

// Generarlo en index.js. Se hará load en domController
export class toDoLayoutDependencies {
  constructor({
    btnCreateNewTaskAction = [],
    formCreateNewTaskAction = [],
    folderClickAction = [],
    taskToggleAction = [],
    taskDeleteAction = [],
    taskEditAction = [],
    taskSaveChangesAction = [],
    taskDiscardChangesAction = [],
    btnCreateNewFolderAction = [],
    formCreateNewFolderAction = [],
    cancelCreateFolderAction = [],
    cancelCreateTaskAction =  [],
    folderDeleteAction = [],

  } = {}) {
    this.btnCreateNewTask = btnCreateNewTaskAction;
    this.formCreateNewTask = formCreateNewTaskAction;
    this.folderClick = folderClickAction;
    this.taskToggle = taskToggleAction;
    this.taskDelete = taskDeleteAction;
    this.taskEdit = taskEditAction;
    this.taskSaveChanges = taskSaveChangesAction;
    this.taskDiscardChanges = taskDiscardChangesAction;

    this.btnCreateNewFolder = btnCreateNewFolderAction;
    this.formCreateNewFolder = formCreateNewFolderAction;
    this.cancelCreateFolder = cancelCreateFolderAction;
    this.cancelCreateTask = cancelCreateTaskAction;
    this.folderDelete = folderDeleteAction;
  }
  // Element => Event => function
  // BtnCreateTasks => click => createNewTask();
}
