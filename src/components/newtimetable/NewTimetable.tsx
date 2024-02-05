import { showAddTimetableAtom } from "@/lib/jotai";
import "./newtimetable.scss";
import { useAtom } from "jotai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, SingleInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

export default function NewTimetable() {
  const [, setShowAddTimetable] = useAtom(showAddTimetableAtom);

  const [value, setValue] = useState<DateRange<Dayjs>>(() => [
    dayjs("2022-04-17T15:30"),
    dayjs("2022-04-17T18:30"),
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setShowAddTimetable(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user_name = formData.get("message")?.toString();
  };

  return (
    <div
      className="newTimetableFormWrapper"
      onClick={() => setShowAddTimetable(false)}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <form
        className="form"
        onSubmit={(e) => handleSubmit(e)}
        onClick={(e) => e.stopPropagation()} // preventing clicking event from parent div to close the form
      >
        <div className="form__header">
          <h1>Add New Timetable</h1>
          <p>Enter the details of the new timetable.</p>
        </div>
        <div className="form__fields">
          <label className="form__fields--label" htmlFor="input-service">
            Service
          </label>
          <TextField
            id="input-service"
            label="Enter the service name"
            variant="outlined"
            autoFocus
          />
          <label className="form__fields--label" htmlFor="input-time">
            Time of Availability
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateTimePicker", "SingleInputTimeRangeField"]}
            >
              <DatePicker label="Select day" />
              <SingleInputTimeRangeField
                id="input-time"
                label="Select time"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <label className="form__fields--label" htmlFor="input-details">
            Additional Details
          </label>
          <textarea
            className="form__fields--textarea"
            id="input-details"
            placeholder="Enter any additional details"
          />
        </div>
        <button type="submit" className="buttonType1">
          Add Timetable
        </button>
      </form>
    </div>
  );
}
