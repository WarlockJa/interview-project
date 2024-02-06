import { TSchemaApiV1dbPOST } from "../validators/schemaTypes";

export default function createTimetable(props: TSchemaApiV1dbPOST) {
  fetch("/api/v1/db", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(props),
  });
}
