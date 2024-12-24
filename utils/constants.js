import { setUpperIdsLimit } from "./functions.js";

export const urlExamTemplate =
  "https://sacad.fce.umss.edu.bo/adm_academica/archivos/examenes/{YEAR}-{SEMESTER}-{RES_ID}/{EXAM_VERSION}/{SUBJECT_ID}-1.pdf";

export const subjectOptions = [1, 269, 285, 286];

export const lowerIdsLimit = 100;
export const upperIdsLimit = await setUpperIdsLimit(lowerIdsLimit);

export const maxGetUrlAttempts = 3;
export const downloadMaxAttempts = 6;
