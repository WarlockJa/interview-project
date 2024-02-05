"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./page.module.css";
import { task } from "@prisma/client";
import Searchbar from "@/components/searchbar/Searchbar";
import { format } from "date-fns";
import NewTimetable from "@/components/newtimetable/NewTimetable";
import { useAtom } from "jotai";
import { showAddTimetableAtom } from "@/lib/jotai";

const TEMP_TABLE: task[] = [
  {
    id: "ckcrjk0uo00000158rj9xj8r0",
    name: "Dental Cleaning",
    details: "Dr. Smith",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 26 * 60 * 60 * 1000),
  },
  {
    id: "ckcrjk0v000010158f0laqts9",
    name: "Eye Checkup",
    details: "Dr. Johnson",
    startTime: new Date(Date.now() + 27 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 30 * 60 * 60 * 1000),
  },
];

export default function page() {
  const [showAddTimetable, setShowAddTimetable] = useAtom(showAddTimetableAtom);

  const handleAddTimetableClick = () => {
    setShowAddTimetable(true);
  };

  const tasks = TEMP_TABLE.map((task) => (
    <TableRow key={task.id}>
      <TableCell className={styles.timetableCell}>{task.name}</TableCell>
      <TableCell className={styles.timetableCell}>
        {format(task.startTime, "yyyy-MM-dd")}
      </TableCell>
      <TableCell className={styles.timetableCell}>
        {format(task.startTime, "k:mm")}
      </TableCell>
      <TableCell className={styles.timetableCell}>
        {format(task.endTime, "k:mm")}
      </TableCell>
      <TableCell className={styles.timetableCell}>{task.details}</TableCell>
      <TableCell className={styles.timetable__task}>
        <button className="buttonType2">Edit</button>
        <button className="buttonType2">Delete</button>
      </TableCell>
    </TableRow>
  ));
  return (
    <div className={styles.timetables}>
      {showAddTimetable && <NewTimetable />}
      <Searchbar />
      <div className={styles.timetable__tableWrapper}>
        <div className={styles.timetable__header}>
          <h1>Timetables</h1>
          <button
            className="buttonType1"
            onClick={() => handleAddTimetableClick()}
          >
            Add Timetable
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="appointments table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.timetableHeaderCell}>
                  Service Type
                </TableCell>
                <TableCell className={styles.timetableHeaderCell}>
                  Date
                </TableCell>
                <TableCell className={styles.timetableHeaderCell}>
                  Start Time
                </TableCell>
                <TableCell className={styles.timetableHeaderCell}>
                  End Time
                </TableCell>
                <TableCell className={styles.timetableHeaderCell}>
                  Notes
                </TableCell>
                <TableCell className={styles.timetableHeaderCell}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tasks}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
