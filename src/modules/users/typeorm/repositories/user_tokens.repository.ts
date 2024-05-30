import { EntityRepository, Repository } from "typeorm";
import User from "../entities/users";
import UserToken from "../entities/users_tokens";


@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken>{

   public async findByToken(token: string) : Promise<UserToken | undefined>{
        const userToken = await this.findOne({where: {token: token}})
        return userToken
   }

   public async generate(user_id: string) : Promise<UserToken | undefined> {

     const userToken = await this.create({user_id: user_id})

     return await this.save(userToken)
   }
}
export default UserTokenRepository