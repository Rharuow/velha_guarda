import { DateTime } from "luxon";

export const isPastDate = (date: Date) => {
  const startAt = DateTime.local(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )
    .reconfigure({
      locale: "pt-BR",
    })
    .setZone("utc");

  const offset = DateTime.local().offset;

  const now = DateTime.local()
    .plus({ hours: offset > 0 ? offset / 60 : offset })
    .setZone("utc");

  console.log("START_AT = ", startAt.get("hour"));
  console.log("NOW = ", now.get("hour"));

  return startAt < now;
};
