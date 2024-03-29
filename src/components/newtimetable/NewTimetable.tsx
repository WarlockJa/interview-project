import { showAddTimetableAtom, timeTablesDataAtom } from "@/lib/jotai";
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
import { TSchemaApiV1dbPOST } from "@/lib/validators/schemaTypes";
import { createId } from "@paralleldrive/cuid2";
import createTimetable from "@/lib/db/createTimetable";

export default function NewTimetable() {
  // atom state flag for add new timetable dialog display
  const [, setShowAddTimetable] = useAtom(showAddTimetableAtom);
  // timetables store data
  const [, setTimetablesData] = useAtom(timeTablesDataAtom);

  const [value, setValue] = useState<DateRange<Dayjs>>(() => [
    dayjs(new Date()),
    dayjs(new Date(Date.now() + 2 * 60 * 60 * 1000)),
  ]);

  // detecting Escape press to close new timetable window
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // preventing closing add new task window if POST request is running
    if (e.key === "Escape") setShowAddTimetable(false);
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

    const id = createId();
    // validating data
    const formDataToParse: TSchemaApiV1dbPOST = {
      // form data validation with zod models
      id,
      serviceName: formService,
      timeStart,
      timeEnd,
      details: formDetails ? formDetails : "",
    };

    const validData = schemaApiV1dbPOST.parse(formDataToParse);
    // TODO add form notifications based on validation errors

    setTimetablesData((prev) => [...prev, validData]);
    // writing result to the DB
    createTimetable(validData);
    // closing add timetable form
    setShowAddTimetable(false);
  };

  return (
    <div
      className="newTimetableFormWrapper"
      onClick={() => setShowAddTimetable(false)}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        onClick={(e) => e.stopPropagation()} // preventing clicking event from parent div to close the form
      >
        <fieldset className="form">
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
                <DatePicker label="Select day" name="formDate" />
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
              id="input-details"
              name="formDetails"
              placeholder="Enter any additional details"
            />
          </div>
          <button type="submit" className="buttonType1">
            Add Timetable
          </button>
        </fieldset>
      </form>
    </div>
  );
}
