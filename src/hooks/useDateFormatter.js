import { useMemo } from "react";

export const useDateFormatter = (isoString) => {
  return useMemo(() => {
    if (!isoString) return "";

    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

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
  }, [isoString]);
};
