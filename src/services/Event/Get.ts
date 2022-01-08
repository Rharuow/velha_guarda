import { getCustomRepository } from "typeorm";
import { EventRepository } from "../../repositories/EventRepository";

export class GetEventService {
  async execute(id: string, withMeetings = false) {
    const eventRepository = getCustomRepository(EventRepository);

    const relations = [];

    if (withMeetings) relations.push("meetings");

    try {
      const event = await eventRepository.findOneOrFail(id, { relations });

      const eventWithMeetings = await eventRepository.findOneWithMeetings(
        event.id
      );

      return {
        status: 200,
        message: "Event Get with success",
        record: withMeetings ? eventWithMeetings : event,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
