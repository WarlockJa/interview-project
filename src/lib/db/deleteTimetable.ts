import { TSchemaApiV1dbDELETE } from "../validators/schemaTypes";

export default function deleteTimetable(props: TSchemaApiV1dbDELETE) {
  // deleting from DB
  fetch("/api/v1/db", {
    method: "DELETE",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(props),
  });
}
