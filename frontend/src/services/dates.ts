import { IDayItem } from "../reducers/workDaysReducer";

const getDateStringList = (days: Array<IDayItem>) => {
  const dates: Set<string> = new Set();
  days.forEach((day: IDayItem) => {
    dates.add(new Date(day.start).toISOString());
  });
  return Array.from(dates);
};

const formatDateTime = (dateIn: string) => {
  const date = new Date(dateIn.replace("Z", ""));
  return date.toLocaleString("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const getTimeStringFromDateString = (dateIn: string | undefined) => {
  if (dateIn) {
    return new Date(dateIn.replace("Z", "")).toLocaleString("en-GB", {
      timeStyle: "short",
    });
  }

  return new Date().toLocaleString("en-GB", {
    timeStyle: "short",
  });
};

export {getDateStringList, formatDateTime, getTimeStringFromDateString};
