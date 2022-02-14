import { getCustomRepository } from "typeorm";
import { MeetRepository } from "../../repositories/MeetRepository";

export class FinishedMeetService {
  async execute(id: string) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const today = new Date();

      await meetRepository.update(id, {
        available: false,
        finished_at: today,
      });

      const meet = await meetRepository.findOneOrFail(id);

      return {
        status: 200,
        message: "Meet Finished with success",
        record: meet,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
