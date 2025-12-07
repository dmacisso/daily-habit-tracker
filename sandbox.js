
export const dateTimeStamp = () => {

  // Get the current date and time
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Format the time string with leading zeros
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString()}`;

  // console.log(formattedTime);

  // Get the full year
  let year = now.getFullYear();

  // Get the current month
  let month = now.getMonth();

  // Get the day
  let day = now.getDate();

  // Format the date string
  const formattedDate = `${month + 1}/${day}/${year}`;

  // console.log(formattedDate)

  // console.log(`${formattedDate} ${formattedTime}`)
  return `${formattedDate} ${formattedTime}`;

};
