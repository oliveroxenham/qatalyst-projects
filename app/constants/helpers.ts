import moment from 'moment';

export const getValueByKeyLocalStorage = (key: string) => {
  const items = { ...localStorage };
  const field = Object.keys(items).find((v) => v.includes(key));
  if (field) {
    return localStorage.getItem(field);
  }

  return null;
};

export const formatTimestamp = (timestamp: string) => {
  const inputDate = moment(timestamp);
  const currentDate = moment();

  if (inputDate.isSame(currentDate, 'day')) {
    return inputDate.format('h:mm A');
  }

  if (currentDate.diff(inputDate, 'days') < 7) {
    return inputDate.format('dddd h:mm A');
  }

  if (currentDate.diff(inputDate, 'days') <= 30) {
    const daysAgo = currentDate.diff(inputDate, 'days');
    return `${daysAgo} days ago`;
  }

  if (inputDate.isSame(currentDate, 'year')) {
    const monthsAgo = currentDate.diff(inputDate, 'months');
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  }

  return inputDate.format('YYYY-MM-DD dddd h:mm A');
};

export const extractInnerStrings = (expression: string): string[] => {
  const regex = /objectValue\["([^"]*)"\]/g;
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(expression)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};
