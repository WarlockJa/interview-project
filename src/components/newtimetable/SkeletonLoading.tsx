import { Skeleton, TableCell, TableRow } from "@mui/material";
import "@/components/timetables/timetables.scss";

export default function SkeletonLoading() {
  const skeleton = (width: number, height: number) => (
    <Skeleton
      variant="rounded"
      height={height}
      width={width}
      animation="wave"
    />
  );

  return (
    <TableRow>
      <TableCell className="timetableCell" height={60}>
        {skeleton(113, 20)}
      </TableCell>
      <TableCell className="timetableCell" height={60}>
        {skeleton(90, 20)}
      </TableCell>
      <TableCell className="timetableCell" height={60}>
        {skeleton(50, 20)}
      </TableCell>
      <TableCell className="timetableCell" height={60}>
        {skeleton(50, 20)}
      </TableCell>
      <TableCell className="timetableCell" height={60}>
        {skeleton(130, 20)}
      </TableCell>
      <TableCell className="timetable__task">
        {skeleton(60, 30)}
        {skeleton(60, 30)}
      </TableCell>
    </TableRow>
  );
}
