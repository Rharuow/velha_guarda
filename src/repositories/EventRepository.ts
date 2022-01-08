import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Event } from "../entities/Event";
import { Meet } from "../entities/Meet";
import { MeetRepository } from "./MeetRepository";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  async findOneWithMeetings(id: string) {
    const meetRepository = getCustomRepository(MeetRepository);
    const meetings: Array<Meet> = [];
    try {
      const event = await this.findOneOrFail(id, { relations: ["meetings"] });

      for (const meet of event.meetings) {
        const meetSerialized = await meetRepository.findOneOrFail(meet.id, {
          relations: ["chars"],
        });
        meetings.push(meetSerialized);
      }

      return {
        ...event,
        meetings,
      };
    } catch (error) {
      console.log(
        `custom repository char findOneWithMeetings = ${error.message}`
      );
      throw new Error(
        `custom repository char findOneWithMeetings = ${error.message}`
      );
    }
  }
}
