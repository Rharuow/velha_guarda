import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { MeetRepository } from "../../repositories/MeetRepository";

export class InsertCharMeetService {
  async execute(meet_id: string, char_id: string) {
    const meetRepository = getCustomRepository(MeetRepository);
    const charRepository = getCustomRepository(CharRepository);

    try {
      const meet = await meetRepository.findOneOrFail(meet_id);
      const char = await charRepository.findOneOrFail(char_id);

      meet.chars.push(char);

      await meetRepository.update(meet_id, { chars: meet.chars });

      return {
        status: 200,
        message: "Meet InsertChar with success",
        record: meet,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
