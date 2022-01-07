import { EntityRepository, Repository } from "typeorm";
import { Char } from "../entities/Char";

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
}
