import { task } from "@prisma/client";
import { atom } from "jotai";

// navigation menu state. Initial number is -1 because on page load
// useOnReloadActiveMenuSet hook will set it according to pathname
export const activeMenuAtom = atom(-1);

// flag to display addNewTimetable dialog
export const showAddTimetableAtom = atom(false);

interface IShowEditTimetable {
  show: boolean;
  id: string;
}
// flag to display editTimetable dialog
export const showEditTimetableAtom = atom<IShowEditTimetable>({
  show: false,
  id: "",
});

// timetables data store
export const timeTablesDataAtom = atom<task[]>([]);
