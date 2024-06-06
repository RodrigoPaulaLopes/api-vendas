import User from "modules/users/typeorm/entities/users";

declare global{
    namespace Express{
        interface Request{
            user: {
                id: string
            }
        }
    } 
}