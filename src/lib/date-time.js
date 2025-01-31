const { format } = require("date-fns");
const { toZonedTime } = require("date-fns-tz");

/**
 * Formats a given date-time to a specific time zone.
 * @param {Date} dateTime - The date-time to format.
 * @returns {string} The formatted date-time string in ISO 8601 format.
 */
const formatDateTime = (dateTime) => {
  const timeZone = "Asia/Jakarta";
  const zonedTime = toZonedTime(dateTime, timeZone);

  const formattedDate = format(zonedTime, "yyyy-MM-dd'T'HH:mm:ssXXX");

  return formattedDate;
};

module.exports = formatDateTime;
