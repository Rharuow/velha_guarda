import _ from "lodash";
import { Between, Raw } from "typeorm";

export type FiltersType = {
  start_at_gteq: string;
  start_at_lteq: string;
};

export const getMeetFilters = (filters: FiltersType | undefined) => {
  const filtersCreated = {};

  if (filters) {
    _.merge(filtersCreated, {
      start_at: Between(filters.start_at_gteq, filters.start_at_lteq),
    });
  }

  return filtersCreated;
};
