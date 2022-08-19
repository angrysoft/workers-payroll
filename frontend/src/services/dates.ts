import { IDayItem } from "../reducers/workDaysReducer";

const getDateStringList = (days: Array<IDayItem>) => {
  const dates: Set<string> = new Set();
  days.forEach((day: IDayItem) => {
    dates.add(new Date(day.start).toISOString());
  });
  return Array.from(dates);
};

const formatDateTime = (dateIn: string) => {
  const date = new Date(dateIn);
  return date.toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export {getDateStringList, formatDateTime};
