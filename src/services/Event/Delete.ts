import { getCustomRepository } from "typeorm";

import { EventRepository } from "../../repositories/EventRepository";
export class DeleteEventService {
  async execute(id: string) {
    const eventRepository = getCustomRepository(EventRepository);

    try {
      const eventDeleted = await eventRepository.delete(id);

      return {
        status: 200,
        message: "Event was Delete with success",
        record: eventDeleted,
      };
    } catch (error) {
      console.log(` Delete Event Service = ${error.message}`);
      throw new Error(` Delete Event Service = ${error.message}`);
    }
  }
}
