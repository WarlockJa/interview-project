import { showEditTimetableAtom, timeTablesDataAtom } from "@/lib/jotai";
import "./timetableform.scss";
import { useAtom } from "jotai";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, SingleInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { schemaApiV1dbPOST } from "@/lib/validators/db";
import updateTimetable from "@/lib/db/updateTimetable";

export default function EditTimetable() {
  // atom state flag for add new timetable dialog display
  const [showEditTimetable, setShowEditTimetable] = useAtom(
    showEditTimetableAtom
  );
  // timetables store data
  const [timetablesData, setTimetablesData] = useAtom(timeTablesDataAtom);

  const currentTimetableData = timetablesData.find(
    (item) => item.id === showEditTimetable.id
  );

  // Datepicker state
  const [value, setValue] = useState<DateRange<Dayjs>>(() => [
    dayjs(currentTimetableData ? currentTimetableData.timeStart : Date.now()),
    dayjs(currentTimetableData ? currentTimetableData.timeEnd : Date.now()),
  ]);

  // timetable with the given ID not found
  // closing edit dialog
  if (!currentTimetableData) {
    setShowEditTimetable({ show: false, id: "" });
    return;
  }

  // detecting Escape press to close new timetable window
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // preventing closing add new task window if POST request is running
    if (e.key === "Escape") setShowEditTimetable({ show: false, id: "" });
  };

  // processing form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // reading form data
    const formData = new FormData(e.currentTarget);
    const formService = formData.get("formService")?.toString();
    const formDate = formData.get("formDate")?.toString();
    const formTime = formData.get("formTime")?.toString();
    const formDetails = formData.get("formDetails")?.toString();

    // formatting form data to use in POST request
    const formDateString = dayjs(formDate).format("YYYY-MM-DD ");

    if (!formTime || !formService) return;
    const formTime_TimeRange = formTime.split(" – ");

    const timeStart: Date = (
      dayjs(
        formDateString.concat(formTime_TimeRange[0])
      ) as unknown as IDayjsFormat
    ).$d;
    const timeEnd: Date = (
      dayjs(
        formDateString.concat(formTime_TimeRange[1])
      ) as unknown as IDayjsFormat
    ).$d;

    const newTimetable = {
      id: currentTimetableData.id,
      serviceName: formService,
      timeStart,
      timeEnd,
      details: formDetails ? formDetails : "",
    };
    // checking that changes has been made to the timetable data
    if (JSON.stringify(currentTimetableData) !== JSON.stringify(newTimetable)) {
      // changes has been made
      // validating data
      const validData = schemaApiV1dbPOST.parse(newTimetable);

      // store data optimistic update
      setTimetablesData((prev) => [
        ...prev.filter((item) => item.id !== validData.id),
        validData,
      ]);

      // updating data in DB
      updateTimetable(validData);
    } // else no changes has been made. closing edit dialog
    // closing add timetable form
    setShowEditTimetable({ show: false, id: "" });
  };

  return (
    <div
      className="newTimetableFormWrapper"
      onClick={() => setShowEditTimetable({ show: false, id: "" })}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        onClick={(e) => e.stopPropagation()} // preventing clicking event from parent div to close the form
      >
        <fieldset className="form">
          <div className="form__header">
            <h1>Update Timetable</h1>
            <p>Edit the details of the timetable.</p>
          </div>
          <div className="form__fields">
            <label className="form__fields--label" htmlFor="input-service">
              Service
            </label>
            <TextField
              id="input-service"
              defaultValue={currentTimetableData.serviceName}
              name="formService"
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
                <DatePicker
                  label="Select day"
                  name="formDate"
                  defaultValue={dayjs(currentTimetableData.timeStart)}
                />
                <SingleInputTimeRangeField
                  id="input-time"
                  name="formTime"
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
              defaultValue={currentTimetableData.details}
              id="input-details"
              name="formDetails"
              placeholder="Enter any additional details"
            />
          </div>
          <button type="submit" className="buttonType1">
            Update Timetable
          </button>
        </fieldset>
      </form>
    </div>
  );
}
