import moment, { Moment } from "moment";

export  const normalizeDate=(date: string | null | undefined | Moment): Moment=> {
  if (!date) return moment(); // Return the current date if the input is null or undefined

  if (moment.isMoment(date)) {
    return date; // If the date is already a Moment object, return it as is
  }

  if (date.includes('T')) {
    return moment(date); // valid DateTime format
  }

  return moment(date + 'T00:00:00.000Z'); // Just a date, append time
}

  