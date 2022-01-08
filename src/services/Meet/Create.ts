import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";
import { CreateMeet } from "../../types/Meet";

export class CreateMeetService {
  async execute({ char_id, event_id, hours, location, start_at }: CreateMeet) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meet = meetRepository.create({
        char_id,
        event_id,
        hours,
        location: location ? location : "Sem local",
        amount_chars: 1,
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
