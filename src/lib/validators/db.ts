import { z } from "zod";
import { regexStartLetterContainsLettersNumbersUnderscore } from "../regexes";

// add new timetable
export const schemaApiV1dbPOST = z
  .object({
    id: z.string().cuid2(),
    serviceName: z
      .string({
        required_error: "Service name required",
      })
      .min(3, { message: "Service name is too short" })
      .max(50, { message: "Service name is too long" })
      .regex(regexStartLetterContainsLettersNumbersUnderscore, {
        message:
          "Service name must start with a letter and may only contain letters, numbers, spaces, and underscores",
      }),
    timeStart: z.coerce.date(),
    timeEnd: z.coerce.date(),
    details: z.string().min(0).max(400, {
      message: "Details field exceeds 400 characters",
    }),
  })
  .strict();

// update existing timetable
export const schemaApiV1dbPUT = z
  .object({
    id: z.string().cuid2(),
    serviceName: z
      .string({
        required_error: "Service name required",
      })
      .min(3, { message: "Service name is too short" })
      .max(50, { message: "Service name is too long" })
      .regex(regexStartLetterContainsLettersNumbersUnderscore, {
        message:
          "Service name must start with a letter and may only contain letters, numbers, spaces, and underscores",
      }),
    timeStart: z.coerce.date(),
    timeEnd: z.coerce.date(),
    details: z.string().min(0).max(400, {
      message: "Details field exceeds 400 characters",
    }),
  })
  .strict();

// delete timetable
export const schemaApiV1dbDELETE = z.object({
  id: z.string().cuid2(),
});
