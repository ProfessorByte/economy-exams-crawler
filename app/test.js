import test from "node:test";
import assert from "node:assert";
import { findValidUrls } from "../utils/crawler.js";
import { subjectOptions } from "../utils/constants.js";

test("Find the valid urls for the given year, semester, examVersion and subjectId", async () => {
  const year = 2023;
  const semester = 1;
  const examVersion = 1;
  const subjectId = subjectOptions[0];

  const validUrls = await findValidUrls(year, semester, examVersion, subjectId);
  console.log(validUrls);
  assert(
    validUrls.length,
    4,
    "Should find 4 valid urls for this given year, semester, examVersion and subjectId"
  );
});
