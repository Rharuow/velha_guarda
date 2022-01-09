import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { MeetRepository } from "../../repositories/MeetRepository";
import { CreateMeet } from "../../types/Meet";

export class CreateMeetService {
  async execute({ char_id, event_id, location, start_at }: CreateMeet) {
    const meetRepository = getCustomRepository(MeetRepository);
    const charRepository = getCustomRepository(CharRepository);

    try {
      const char = await charRepository.findOneOrFail({
        where: { id: char_id },
      });

      const meet = meetRepository.create({
        chars: [char],
        event_id,
        location: location ? location : "Sem local",
        start_at,
      });

      await meetRepository.save(meet);

      return {
        status: 200,
        message: "Meet Create with success",
        record: meet,
      };
    } catch (error) {
      console.log(`Create Meet Service = ${error.message}`);
      throw new Error(`Create Meet Service = ${error.message}`);
    }
  }
}
