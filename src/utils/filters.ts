import _ from "lodash";
import { Between, ILike, Raw } from "typeorm";

export type FiltersType = {
  start_at_gteq: string;
  start_at_lteq: string;
  event?: {
    name?: string;
  };
};

export const getMeetFilters = (filters: FiltersType | undefined) => {
  const filtersCreated = {};

  if (filters) {
    if (filters.start_at_gteq && filters.start_at_lteq)
      _.merge(filtersCreated, {
        start_at: Between(filters.start_at_gteq, filters.start_at_lteq),
      });
    if (filters.event && filters.event.name)
      _.merge(filtersCreated, {
        event: {
          name: ILike(`%${filters.event.name}%`),
        },
      });
  }

  console.log("filtersCreated = ", filtersCreated);

  return filtersCreated;
};
