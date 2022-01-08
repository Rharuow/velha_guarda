import { getCustomRepository } from 'typeorm';
import { EventRepository } from '../../repositories/EventRepository';
 
export class ListEventService {
    async execute() {
        const eventRepository = getCustomRepository(EventRepository);

        try {
            const events = await eventRepository.find()
            return {
                status: 200,
                message: 'Event was List with success',
                record: events,
            };
        } catch(error) {
          console.log(` = ${error.message}`);
          throw new Error(` = ${error.message}`);
        };
    }
}