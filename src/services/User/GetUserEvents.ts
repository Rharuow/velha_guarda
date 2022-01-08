import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../../repositories/UserRepository';
import { usersWithEventsSerializer } from '../../serializers/User';
 
export class GetUserEventsService {
    async execute(email:string) {
        const userRepository = getCustomRepository(UserRepository);

        try {

            const user = await userRepository.findOne({ where: { email }, relations: ['events'] })
            
            return {
                status: 200,
                message: 'Get user events with sucess',
                record: usersWithEventsSerializer(user),
            };

        } catch(error) {
          console.log(` = ${error.message}`);
          throw new Error(` = ${error.message}`);
        };
    }
}