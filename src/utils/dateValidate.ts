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

  const now = DateTime.local()
    .plus({ hours: DateTime.local().offset / 60 })
    .setZone("utc");

  return startAt < now;
};
