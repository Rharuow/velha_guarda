import { getCustomRepository } from "typeorm";
import { CreateEvent } from "../../types/Events";

import { EventRepository } from "../../repositories/EventRepository";
export class CreateEventService {
  async execute({
    cooldown,
    lvl_max,
    lvl_min,
    max_chars,
    min_chars,
    name,
    user_id,
  }: CreateEvent) {
    const eventRepository = getCustomRepository(EventRepository);

    try {
      const event = eventRepository.create({
        cooldown,
        lvl_max,
        lvl_min,
        max_chars,
        min_chars,
        name,
        user_id,
      });

      await eventRepository.save(event);

      return {
        status: 200,
        message: "Event was Create with success",
        record: event,
      };
    } catch (error) {
      console.log(`Create Event Service = ${error.message}`);
      throw new Error(`Create Event Service = ${error.message}`);
    }
  }
}
