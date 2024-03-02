export function convertDate(dateString) {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year.toString()}`;
}


export function isBetweenDates(startDateStr, endDateStr) {

  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  if (!regex.test(startDateStr) || !regex.test(endDateStr)) {
    throw new Error('Invalid date format. Please use YYYY-MM-DDTHH:MM:SS.mmmZ');
  }

 const startDate = new Date(startDateStr.slice(0, 10))
  const endDate = new Date(endDateStr.slice(0, 10))
  
  const startDateInMillis = startDate.getTime();
  const endDateInMillis = endDate.getTime();

  const today = new Date();
  const todayInMillis = today.getTime();
  return (todayInMillis >= startDateInMillis) && (todayInMillis <= endDateInMillis);
}
