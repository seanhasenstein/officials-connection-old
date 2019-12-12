export const emailFormat = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export function formatRegFormDate(date) {
  const format = 'mm/dd/yyyy';
  const delimiter = '/';
  const formatItems = format.split(delimiter);
  const dateItems = date.split(delimiter);
  const monthIndex = formatItems.indexOf('mm');
  const dayIndex = formatItems.indexOf('dd');
  const yearIndex = formatItems.indexOf('yyyy');
  let year = parseInt(dateItems[yearIndex], 10);
  // adjust for 2 digit year
  if (year < 100) year += 2000;
  let month = parseInt(dateItems[monthIndex], 10);
  month -= 1;
  const formatedDate = new Date(year, month, dateItems[dayIndex]);

  const x = `${getDayText(formatedDate)} ${formatedDate.getMonth() +
    1}/${formatedDate.getDate()}`;
  return x;
}

function getDayText(input) {
  const day = input.getDay();

  if (day === 0) return 'Sunday';
  if (day === 1) return 'Monday';
  if (day === 2) return 'Tuesday';
  if (day === 3) return 'Wednesday';
  if (day === 4) return 'Thursday';
  if (day === 5) return 'Friday';
  if (day === 6) return 'Saturday';
}

export function convertTime(input) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = input.getFullYear();
  const month = months[input.getMonth()];
  const day = input.getDate();
  const hours = input.getHours();
  const minutes = input.getMinutes();

  if (hours < 12) return `${month} ${day}, ${year} at ${hours}:${minutes}am`;
  if (hours == 12) return `${month} ${day}, ${year} at ${hours}:${minutes}pm`;
  if (hours > 12)
    return `${month} ${day}, ${year} at ${hours - 12}:${minutes}pm`;
}
