import { TSchemaApiV1dbPUT } from "../validators/schemaTypes";

export default function updateTimetable(props: TSchemaApiV1dbPUT) {
  fetch("/api/v1/db", {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(props),
  });
}
