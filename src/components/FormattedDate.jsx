import React from "react";

const FormattedDate = ({ date, format = "ordinal" }) => {
  if (!date) return null;

  const formatWithOrdinal = (isoString) => {
    const dateObj = new Date(isoString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "long" });
    const year = dateObj.getFullYear();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)} ${year}`;
  };

  const formatStandard = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate =
    format === "ordinal" ? formatWithOrdinal(date) : formatStandard(date);

  return <span className="formatted-date">{formattedDate}</span>;
};

export default FormattedDate;
