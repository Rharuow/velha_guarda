import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";
import { isPastDate } from "../../utils/dateValidate";
import { FiltersType, getMeetFilters } from "../../utils/filters";
import { FinishedMeetService } from "./Finished";

export class ListMeetService {
  async execute(page: number, filters: FiltersType | any) {
    const meetRepository = getCustomRepository(MeetRepository);
    const finishedMeetService = new FinishedMeetService();

    try {
      const meetings = await meetRepository.findAndCount({
        relations: ["chars", "event"],
        take: 5,
        skip: 5 * (page + 1) - 5,
        where: getMeetFilters(filters),
      });
      meetings[0][0] && isPastDate(meetings[0][0].start_at);
      for (const meet of meetings[0]) {
        if (meet.available && isPastDate(meet.start_at)) {
          await finishedMeetService.execute(meet.id);
          meet.available = false;
        }
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
