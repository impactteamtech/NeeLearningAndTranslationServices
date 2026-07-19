import { z } from "zod";

const positiveId = z
  .string()
  .trim()
  .regex(/^\d+$/, "Enter a numeric ID.")
  .transform((value) => Number(value));

export const fileLookupSchema = z.object({
  fileId: positiveId.optional().or(z.literal("")),
  translationRequestId: positiveId.optional().or(z.literal("")),
});

export type FileLookupInput = z.input<typeof fileLookupSchema>;
