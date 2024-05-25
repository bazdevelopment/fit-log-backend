import dayjs from "dayjs";

/**
 * The initializeWeek function generates a nested object representing a date range from a specified start date to an end date. Each date in this range is initialized to null within a structure organized by year and month.
e.g of returned format
{
  "2024-05": {
    "2024-05-01": null,
    "2024-05-02": null,
    "2024-05-03": null,
    "2024-05-04": null,
    "2024-05-05": null,
    "2024-05-06": null,
    "2024-05-07": null
  }
}

 */
export const initializeWeek = (
  startDate: string,
  endDate: string
): { [key: string]: null } => {
  const dates = {};
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    const month = currentDate.format("YYYY-MM");
    const day = currentDate.format("YYYY-MM-DD");

    if (!dates[month]) {
      dates[month] = {};
    }

    dates[month][day] = null;
    currentDate = currentDate.add(1, "day");
  }

  return dates;
};
