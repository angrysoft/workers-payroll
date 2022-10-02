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

const getTimeStringFromDateString = (dateIn: string | undefined) => {
  if (dateIn) {
    return new Date(dateIn).toLocaleString("en-GB", {
      timeStyle: "short",
    });
  }

  return new Date().toLocaleString("en-GB", {
    timeStyle: "short",
  });
};

const toLocalJSON = (dateIn: string) => {
  const date = new Date(dateIn);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat(
      "en-US", {month: "2-digit"},
  ).format(date);
  const day = new Intl.DateTimeFormat("en-US", {day: "2-digit"}).format(date);
  return `${year}-${month}-${day}T${date.toLocaleTimeString("pl-PL")}`;
};

export {getDateStringList, formatDateTime, getTimeStringFromDateString, toLocalJSON};
