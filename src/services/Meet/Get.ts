import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";

export class GetMeetService {
  async execute(id: string, withEvent = false, withChars = false) {
    const meetRepository = getCustomRepository(MeetRepository);

    const relations = [];

    if (withChars) relations.push("chars");
    if (withEvent) relations.push("event");

    try {
      const meet = await meetRepository.findOneOrFail(id, { relations });

      return {
        status: 200,
        message: "Meet Get with success",
        record: meet,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
