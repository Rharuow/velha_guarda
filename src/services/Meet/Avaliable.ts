import { getCustomRepository } from "typeorm";

import { MeetRepository } from "../../repositories/MeetRepository";
export class AvailableMeetService {
  async execute(id: string, available: boolean) {
    const meetRepository = getCustomRepository(MeetRepository);

    try {
      await meetRepository.update(id, { available });

      const meet = await meetRepository.findOneOrFail(id);

      return {
        status: 200,
        message: "Meet was Unavaliable with success",
        record: meet,
      };
    } catch (error) {
      console.log(`Meet Unavaliable = ${error.message}`);
      throw new Error(`Meet Unavaliable = ${error.message}`);
    }
  }
}
