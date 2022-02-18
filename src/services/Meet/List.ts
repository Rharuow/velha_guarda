import { getCustomRepository, ILike, Raw } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";
import { FiltersType, getMeetFilters } from "../../utils/filters";

export class ListMeetService {
  async execute(page: number, filters: FiltersType) {
    const meetRepository = getCustomRepository(MeetRepository);

    const setFilter = () => getMeetFilters(filters);

    try {
      const meetings = await meetRepository.findAndCount({
        relations: ["chars", "event"],
        take: 5,
        skip: 5 * (page + 1) - 5,
        where: setFilter(),
      });

      return {
        status: 200,
        message: "Meet List with success",
        record: meetings,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
