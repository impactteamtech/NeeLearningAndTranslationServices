import { z } from "zod";

export const MAX_QUICK_TRANSLATION_CHARACTERS = 5000;
export const ALLOWED_LEARNER_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "application/rtf",
];

const positiveInteger = z
  .string()
  .trim()
  .regex(/^\d+$/, "Enter a positive numeric ID.")
  .transform(Number)
  .refine((value) => value > 0, "Enter a positive numeric ID.");

export const learnerFileUploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Choose a file before uploading." })
    .refine((file) => file.size > 0, "Choose a file that is not empty.")
    .refine(
      (file) =>
        ALLOWED_LEARNER_FILE_TYPES.includes(file.type) ||
        /\.(pdf|doc|docx|txt|rtf)$/i.test(file.name),
      "Choose a PDF, Word document, TXT, or RTF file."
    ),
});

export const quickTranslationSchema = z.object({
  sourceText: z
    .string()
    .trim()
    .min(1, "Enter text to translate.")
    .max(
      MAX_QUICK_TRANSLATION_CHARACTERS,
      `Keep translations under ${MAX_QUICK_TRANSLATION_CHARACTERS.toLocaleString()} characters.`
    ),
  target: z.string().trim().min(1, "Choose a target language."),
});

export const learnerFileLookupSchema = z.object({
  fileId: positiveInteger.optional().or(z.literal("")),
  translationRequestId: positiveInteger.optional().or(z.literal("")),
});

export type LearnerFileUploadValues = z.input<typeof learnerFileUploadSchema>;
export type LearnerFileLookupValues = z.input<typeof learnerFileLookupSchema>;
export type QuickTranslationValues = z.input<typeof quickTranslationSchema>;
