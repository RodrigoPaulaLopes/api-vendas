import { EntityRepository, Repository } from "typeorm";
import User from "../entities/users";


@EntityRepository(User)
class UserRepository extends Repository<User> {

     public async findByEmail(email: string): Promise<User | undefined> {
          const user = await this.findOne({ where: { email: email } })
          return user
     }
     public async findByName(name: string): Promise<User | undefined> {
          const user = await this.findOne({ where: { name: name } })
          return user
     }
     public async findById(id: string): Promise<User | undefined> {
          return this.findOne(id);
     }
}
export default UserRepository