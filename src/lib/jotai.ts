import { atom } from "jotai";

// navigation menu state. Initial number is -1 because on page load
// useOnReloadActiveMenuSet hook will set it according to pathname
export const activeMenuAtom = atom(-1);

export const showAddTimetableAtom = atom(false);
