import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";

export class ListMeetService {
  async execute(page: number) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meetings = await meetRepository.find({
        relations: ["chars", "event"],
        take: 5,
        skip: page,
      });

      console.log(meetings.length);
      console.log(page);

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
