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
import "./timetables.scss";
import Searchbar from "@/components/searchbar/Searchbar";
import NewTimetable from "@/components/newtimetable/NewTimetable";
import { useAtom } from "jotai";
import {
  showAddTimetableAtom,
  showEditTimetableAtom,
  timeTablesDataAtom,
} from "@/lib/jotai";
import dayjs from "dayjs";
import SkeletonLoading from "@/components/newtimetable/SkeletonLoading";
import { TSchemaApiV1dbDELETE } from "@/lib/validators/schemaTypes";
import deleteTimetable from "@/lib/db/deleteTimetable";
import EditTimetable from "@/components/newtimetable/EditTimetable";
import useGetData from "@/hooks/useGetData";

export default function Timetables() {
  const [showAddTimetable, setShowAddTimetable] = useAtom(showAddTimetableAtom);
  const [showEditTimetable, setShowEditTimetable] = useAtom(
    showEditTimetableAtom
  );
  const [timetablesData, settimetablesData] = useAtom(timeTablesDataAtom);
  // fetch initial DB data hook
  const { data, loading } = useGetData();

  // edit timetable button click
  const handleEdit = (id: string) => {
    setShowEditTimetable({ show: true, id });
  };

  // delete timetable button click
  const handleDelete = (props: TSchemaApiV1dbDELETE) => {
    // optimistic data update
    const newTimetablesData = timetablesData.filter(
      (item) => item.id !== props.id
    );
    settimetablesData(newTimetablesData);

    // deleting timetable from DB
    deleteTimetable(props);
  };

  // add new timetable button click
  const handleAddTimetableClick = () => {
    setShowAddTimetable(true);
  };

  let content;
  if (loading) {
    content = (
      <>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </>
    );
  } else {
    content = data.map((task) => (
      <TableRow key={task.id}>
        <TableCell className="timetableCell">{task.serviceName}</TableCell>
        <TableCell className="timetableCell">
          {dayjs(task.timeStart).format("YYYY-MM-DD")}
        </TableCell>
        <TableCell className="timetableCell">
          {dayjs(task.timeStart).format("HH:mm")}
        </TableCell>
        <TableCell className="timetableCell">
          {dayjs(task.timeEnd).format("HH:mm")}
        </TableCell>
        <TableCell className="timetableCell">{task.details}</TableCell>
        <TableCell className="timetable__task">
          <button onClick={() => handleEdit(task.id)} className="buttonType2">
            Edit
          </button>
          <button
            onClick={() => handleDelete({ id: task.id })}
            className="buttonType2"
          >
            Delete
          </button>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <div className="timetables">
      {showAddTimetable && <NewTimetable />}
      {showEditTimetable.show && <EditTimetable />}
      <Searchbar />
      <div className="timetable__tableWrapper">
        <div className="timetable__header">
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
                <TableCell className="timetableHeaderCell">
                  Service Type
                </TableCell>
                <TableCell className="timetableHeaderCell">Date</TableCell>
                <TableCell className="timetableHeaderCell">
                  Start Time
                </TableCell>
                <TableCell className="timetableHeaderCell">End Time</TableCell>
                <TableCell className="timetableHeaderCell">Notes</TableCell>
                <TableCell className="timetableHeaderCell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
