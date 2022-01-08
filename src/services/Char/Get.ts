import { getCustomRepository } from "typeorm";

import { CharRepository } from "../../repositories/CharRepository";
export class GetCharService {
  async execute(char_id: string, withMeetings = false) {
    const charRepository = getCustomRepository(CharRepository);

    const relations = [];

    if (withMeetings) relations.push("meetings");

    try {
      const char = await charRepository.findOneOrFail(char_id, { relations });

      const charWithMeetings = await charRepository.findOneWithMeetings(
        char.id
      );

      return {
        status: 200,
        message: "Char was Get with success",
        record: withMeetings ? charWithMeetings : char,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
