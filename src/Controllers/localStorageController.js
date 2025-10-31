const localStorageController = {
  saveFoldersInStorage(folders) {
    localStorage.setItem("folders", JSON.stringify(folders));
  },

  saveTasksInStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },

  checkIfExists(key) {
    if (localStorage.getItem(key) == null) return false;
    else return true;
  },

  loadFromStorage(key) {
    return localStorage.getItem(key);
  },

  updateTasks(tasks, currentFolder, folders) {
    const updatedFolders = folders.map((f) => {
      if (f.id === currentFolder.id) {
        return {
          ...f,
          tasks: [...tasks],
        };
      }
      return f;
    });

    this.saveFoldersInStorage(updatedFolders);
  },

  addCreatedFolder(newFolder, folders){
    const newFolders = [...folders, newFolder];
    this.saveFoldersInStorage(newFolders);
  },

  addCreatedTask(task, folder, folders) {
    const updatedFolders = folders.map((f) => {
      if (f.id === folder.id) {
        // Filtramos las tareas que no sean null
        const cleanedTasks = f.tasks.filter((t) => t !== null);

        // Agregamos la nueva tarea (si no es null)
        const newTasks = [...cleanedTasks, task];

        return {
          ...f,
          tasks: newTasks,
        };
      }
      return f;
    });

    this.saveFoldersInStorage(updatedFolders);
  },
};

export default localStorageController;
