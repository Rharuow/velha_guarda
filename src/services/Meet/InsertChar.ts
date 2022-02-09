import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { MeetRepository } from "../../repositories/MeetRepository";

export class InsertCharMeetService {
  async execute(meet_id: string, char_id: string) {
    const meetRepository = getCustomRepository(MeetRepository);
    const charRepository = getCustomRepository(CharRepository);

    try {
      const meet = await meetRepository.findOneOrFail(meet_id, {
        relations: ["chars"],
      });
      const char = await charRepository.findOneOrFail(char_id);

      meet.chars.push(char);

      const newMeet = await meetRepository.update(meet_id, {
        chars: meet.chars,
      });

      console.log(newMeet);

      return {
        status: 200,
        message: "Meet InsertChar with success",
        record: meet,
      };
    } catch (error) {
      console.log(` Meet InsertChar = ${error.message}`);
      throw new Error(` Meet InsertChar = ${error.message}`);
    }
  }
}
