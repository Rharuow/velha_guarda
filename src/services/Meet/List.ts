import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";

export class ListMeetService {
  async execute(page: number) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meetings = await meetRepository.find({
        relations: ["chars", "event"],
        take: 5,
        skip: 5 * (page + 1) - 5,
      });

      const meetingsAndCount = await meetRepository.findAndCount({
        relations: ["chars", "event"],
        take: 5,
        skip: 5 * (page + 1) - 5,
      });

      console.log("meetingsAndCount = ", meetingsAndCount);

      return {
        status: 200,
        message: "Meet List with success",
        record: meetingsAndCount,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
