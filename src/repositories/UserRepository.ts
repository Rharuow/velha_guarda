import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { userWithCharSerializer } from "../serializers/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async userExists({ email, name }: { email: string; name: string }) {
    try {
      const userAlreadyExits = await this.createQueryBuilder("user")
        .where("user.name = :name", { name })
        .orWhere("user.email = :email", { email })
        .getOne();

      if (userAlreadyExits)
        return { message: "User Already Exists", status: true };

      return { message: "User doesn't Exists", status: false };
    } catch (error) {
      console.log(`custom repository userExists = ${error.message}`);
      throw new Error(`custom repository userExists = ${error.message}`);
    }
  }
}
