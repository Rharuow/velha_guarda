import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";

export class EventsCharService {
  async execute(id: string) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const events = await charRepository.findEvents(id);

      return {
        status: 200,
        message: "Char Events with success",
        record: events,
      };
    } catch (error) {
      console.log(` Char Events Service = ${error.message}`);
      throw new Error(`Char Events Service = ${error.message}`);
    }
  }
}
