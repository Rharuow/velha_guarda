import { Request, Response } from 'express';
import { ListEventService } from '../../services/Event/List';
 
export class ListEventController {
    async handle(req: Request, res: Response) {
        const listEventService = new ListEventService()

        try {
            const {message, record, status } = await listEventService.execute()
            
            return res.status(status).json({
                message,
                record,
            });
        } catch(error) {
            return res.status(500).json({
                message: `${error.message}`,
            });
        }
    }
}