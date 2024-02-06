import { z } from "zod";
import { schemaApiV1dbDELETE, schemaApiV1dbPOST, schemaApiV1dbPUT } from "./db";

export type TSchemaApiV1dbPOST = z.infer<typeof schemaApiV1dbPOST>;

export type TSchemaApiV1dbPUT = z.infer<typeof schemaApiV1dbPUT>;

export type TSchemaApiV1dbDELETE = z.infer<typeof schemaApiV1dbDELETE>;
