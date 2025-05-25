import moment from "moment";

export const formatChatTimestamp = (isoString) => {
  const date = moment(isoString);               // 1️⃣ Convert ISO string to moment object
  const now = moment();                         // 2️⃣ Get the current date and time

  if (date.isSame(now, 'day')) {                // 3️⃣ If it's today
    return date.format('h:mm A');               // 👉 Return just the time (e.g., "10:08 AM")
  } else if (date.isSame(moment().subtract(1, 'day'), 'day')) {  // 4️⃣ If it was yesterday
    return `Yesterday at ${date.format('h:mm A')}`;              // 👉 "Yesterday at 10:08 AM"
  } else {                                       // 5️⃣ Any other day
    return date.format('MMMM D, YYYY [at] h:mm A');  // 👉 "May 4, 2025 at 10:08 AM"
  }
};
