import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";
import { isPastDate } from "../../utils/dateValidate";
import { FiltersType, getMeetFilters } from "../../utils/filters";

export class ListMeetService {
  async execute(page: number, filters: FiltersType | any) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meetings = await meetRepository.findAndCount({
        relations: ["chars", "event"],
        take: 5,
        skip: 5 * (page + 1) - 5,
        where: getMeetFilters(filters),
      });

      for (const meet of meetings[0]) {
        isPastDate(meet.start_at);
        // if (meet.available && isPastDate(meet.start_at)) {
        // await meetRepository.update(meet.id, { available: false });
        // meet.available = false;
        console.log("isPast?");
        // }
      }

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
