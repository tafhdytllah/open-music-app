const { format } = require("date-fns");
const { toZonedTime } = require("date-fns-tz");

const formatDateTime = (dateTime) => {
  // Konversi ke zona waktu tertentu (misalnya Asia/Jakarta)
  const timeZone = "Asia/Jakarta";
  const zonedTime = toZonedTime(dateTime, timeZone);

  // Format waktu dengan offset zona waktu
  const formattedDate = format(zonedTime, "yyyy-MM-dd'T'HH:mm:ssXXX");

  return formattedDate;
};

module.exports = formatDateTime;
