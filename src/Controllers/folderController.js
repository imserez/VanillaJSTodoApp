import {
  createDummyFolder,
  createInboxFolder,
} from "../Factories/folderFactory";
import localStorageController from "./localStorageController";

export default function createFolderController() {
  let _folders;
  let _currentFolder;

  const setCurrentFolder = (folder) => {
    _currentFolder = folder;
  };
  const getFolders = () => {
    return _folders;
  };

  function loadFolders() {
    let folders = [];
    if (localStorageController.checkIfExists("folders")) {
      folders = JSON.parse(localStorageController.loadFromStorage("folders"));
    } else {
      // Init with createinboxfolder.
      folders.push(createInboxFolder());
      folders.push(createDummyFolder("Ideas"));
      folders.push(createDummyFolder("To-do"));
      folders.push(createDummyFolder("Work"));
      localStorageController.saveFoldersInStorage(folders);
    }
    return folders;
  }
  function getInboxFolder(folders) {
    return folders.find((fol) => fol.id === "inbox-folder") || null;
  }

  return { loadFolders, getInboxFolder, setCurrentFolder, getFolders };
}

/*

export default function folderController () {

     let _folders;

    function setFolders(folders){
        _folders = folders;
        domController.renderFolders(folders)
    }

    const getFolders = () => { return _folders}

    function loadFolders() {

        let folders = []
        if (localStorageController.checkIfExists("folders")){
            folders = JSON.parse(localStorageController.loadFromStorage("folders"));
        } else { // Init with createinboxfolder.
            folders.push(createInboxFolder());
            folders.push(createDummyFolder());
            folders.push(createDummyFolder());
            folders.push(createDummyFolder());
            localStorageController.saveFoldersInStorage(folders);
        }
        setFolders(folders);
    }

    return ({loadFolders, getFolders})
}


*/

/*
    const base = createBaseController("folders", domController.renderFolders);

    function loadFolders() {
        base.loadItems(() => [
            createInboxFolder(),
            createDummyFolder(),
            createDummyFolder
        ]);
    }
    return ({...base, loadFolders})

*/

/*

 let _folders;

    function setFolders(folders){
        _folders = folders;
        domController.renderFolders(folders)
    }

    const getFolders = () => { return _folders}

    function loadFolders() {

        let folders = []
        if (localStorageController.checkIfExists("folders")){
            folders = JSON.parse(localStorageController.loadFromStorage("folders"));
        } else { // Init with createinboxfolder.
            folders.push(createInboxFolder());
            folders.push(createDummyFolder());
            folders.push(createDummyFolder());
            folders.push(createDummyFolder());
            localStorageController.saveFoldersInStorage(folders);
        }
        setFolders(folders);
    }

    return ({loadFolders, getFolders})


*/

/*

const folderController = {

    loadFolders() {
        // Loading folders from memory
        // Send them to the layoutController to display them?
        domController.renderFolders({})
    }
}

export default folderController;

*/
