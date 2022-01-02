import { EntityRepository, Repository } from "typeorm";
import { Meet } from "../entities/Meet";

@EntityRepository(Meet)
export class MeetRepository extends Repository<Meet> {}
