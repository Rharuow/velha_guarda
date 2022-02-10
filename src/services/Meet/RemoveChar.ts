import { getCustomRepository } from "typeorm";

import { MeetRepository } from "../../repositories/MeetRepository";
export class RemoveCharMeetService {
  async execute(meet_id: string, char_id: string) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meet = await meetRepository.findOneOrFail(meet_id, {
        relations: ["chars"],
      });

      meet.chars = meet.chars.filter((char) => char.id !== char_id);

      const newMeet = await meetRepository.save(meet);

      return {
        status: 200,
        message: "Meet was RemoveChar with success",
        record: newMeet,
      };
    } catch (error) {
      console.log(` Remove Char Meet Service = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
