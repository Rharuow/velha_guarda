import { getCustomRepository } from "typeorm";
import { EventRepository } from "../../repositories/EventRepository";
import { EditEvent } from "../../types/Events";

export class EditEventService {
  async execute({
    cooldown,
    lvl_max,
    lvl_min,
    max_chars,
    min_chars,
    name,
    id,
  }: EditEvent) {
    const eventRepository = getCustomRepository(EventRepository);

    try {
      const event = await eventRepository.update(id, {
        cooldown,
        lvl_max,
        lvl_min,
        max_chars,
        min_chars,
        name,
      });
      return {
        status: 200,
        message: "Event Edit with success",
        record: event,
      };
    } catch (error) {
      console.log(`Event Edit = ${error.message}`);
      throw new Error(`Event Edit = ${error.message}`);
    }
  }
}
