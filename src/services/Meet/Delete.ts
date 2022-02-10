import { getCustomRepository } from "typeorm";

import { MeetRepository } from "../../repositories/MeetRepository";
export class DeleteMeetService {
  async execute(id: string) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      const meetRemoved = await meetRepository.delete(id);

      return {
        status: 200,
        message: "Meet was Delete with success",
        record: meetRemoved,
      };
    } catch (error) {
      console.log(` DeleteMeetService = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
