import Folder from "../Models/folder";
import { createDemoTask } from "./taskFactory";

export function createInboxFolder() {
  return new Folder({
    title: "Inbox",
    description: "This is the inbox folder.",
    position: 1,
    id: "inbox-folder",
    defaultTask: createDemoTask(),
  });
}
export function createDummyFolder(title) {
  return new Folder({
    title: title,
    description: "Dum-Dummy folder!.",
    position: 1,
  });
}
