import axios from "axios";
import { replaceUrl } from "./functions.js";
import {
  urlExamTemplate,
  lowerIdsLimit,
  upperIdsLimit,
  subjectOptions,
  maxGetUrlAttempts,
} from "./constants.js";

let validUrls = [];

export const findValidUrls = async (year, semester, examVersion, subjectId) => {
  for (
    let resourceId = lowerIdsLimit;
    resourceId <= upperIdsLimit;
    resourceId++
  ) {
    const examUrl = replaceUrl(
      urlExamTemplate,
      year,
      semester,
      resourceId,
      examVersion,
      subjectId
    );
    let numAttempt = 1;

    while (numAttempt <= maxGetUrlAttempts) {
      try {
        const responseExam = await axios.head(examUrl);
        if (responseExam.status === 404) break;
        if (responseExam.status === 200) {
          console.log(`Recurso encontrado (intento ${numAttempt}): ${examUrl}`);
          validUrls.push({
            slug: `${year}-${semester}-${resourceId}-${examVersion}-${subjectId}`,
            examUrl,
            year,
            semester,
            resourceId,
            examVersion,
            subjectId,
          });
          break;
        }
      } catch /*(error)*/ {
        // console.error(`Error examUrl: ${examUrl}`);
      }
      numAttempt++;
    }
  }

  return validUrls;
};

export const getValidUrls = async () => {
  const promises = [];

  for (let year = 2021; year <= new Date().getFullYear(); year++) {
    for (let semester = 1; semester <= 2; semester++) {
      for (let examVersion = 1; examVersion <= 3; examVersion++) {
        for (let subjectId of subjectOptions) {
          promises.push(findValidUrls(year, semester, examVersion, subjectId));
        }
      }
    }
  }

  try {
    await Promise.all(promises);
  } catch /*(error)*/ {
    // console.error(error);
  }

  return validUrls.sort((a, b) => {
    if (a.examUrl < b.examUrl) return -1;
    if (a.examUrl > b.examUrl) return 1;
    return 0;
  });
};
