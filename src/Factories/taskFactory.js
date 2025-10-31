import Task from "../Models/task";

export function createBlankTask() {
  return new Task("", "", "", 0, "", false);
}

export function createDemoTask() {
  return new Task("Visit imserez github!", "", 0, "", false);
}
