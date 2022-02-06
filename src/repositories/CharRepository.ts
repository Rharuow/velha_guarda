import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Char } from "../entities/Char";
import { Meet } from "../entities/Meet";
import { EventRepository } from "./EventRepository";
import { MeetRepository } from "./MeetRepository";

@EntityRepository(Char)
export class CharRepository extends Repository<Char> {
  async charExists(name: string) {
    try {
      const charAlreadyExits = await this.createQueryBuilder("char")
        .where("char.name = :name", { name })
        .getOne();

      if (charAlreadyExits)
        return { message: "Char Already Exists", status: true };

      return { message: "Char doesn't Exists", status: false };
    } catch (error) {
      console.log("custom repository charExists Error");
      throw new Error(`custom repository charExists Error = ${error.message}`);
    }
  }

  async findOneWithMeetings(id: string) {
    const meetRepository = getCustomRepository(MeetRepository);
    const meetings: Array<Meet> = [];
    try {
      const char = await this.findOneOrFail(id, { relations: ["meetings"] });

      for (const meet of char.meetings) {
        const meetSerialized = await meetRepository.findOneOrFail(meet.id, {
          relations: ["event"],
        });
        meetings.push(meetSerialized);
      }

      return {
        ...char,
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
