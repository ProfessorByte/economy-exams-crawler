export const replaceUrl = (
  url,
  year,
  semester,
  resourceId,
  examVersion,
  subjectId
) =>
  url
    .replace("{YEAR}", year)
    .replace("{SEMESTER}", semester)
    .replace("{RES_ID}", resourceId)
    .replace("{EXAM_VERSION}", examVersion)
    .replace("{SUBJECT_ID}", subjectId);

export const getCurrentTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let day = String(currentDate.getDate()).padStart(2, "0");
  let hour = String(currentDate.getHours()).padStart(2, "0");
  let minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const currentTime = `Date: ${year}-${month}-${day} Time: ${hour}:${minutes}`;
  return currentTime;
};

export const setUpperIdsLimit = async (lowerIdsLimit) => {
  try {
    const validUrls = (
      await import("../validUrls.json", { with: { type: "json" } })
    ).default;

    const upperIdsLimit =
      validUrls.reduce(
        (acc, urlData) => (urlData.resourceId > acc ? urlData.resourceId : acc),
        lowerIdsLimit
      ) + 24;
    console.log("Setting upperIdsLimit to: ", upperIdsLimit);
    return upperIdsLimit;
  } catch /*(error)*/ {
    // console.error("Error setting upperIdsLimit: ", error);
    console.log("Setting upperIdsLimit to default value: 300");
    return 300;
  }
};
