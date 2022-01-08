import { Request, Response } from 'express';
import { GetUserEventsService } from '../../services/User/GetUserEvents';
 
export class GetUserEventsController {
    async handle(req: Request, res: Response) {

        const getUserEventsService = new GetUserEventsService()

        const {email} = req.params as { email: string }

        try {

            const {message, record, status } = await getUserEventsService.execute(email)
            
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