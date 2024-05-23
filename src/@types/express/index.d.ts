import User from "modules/users/typeorm/entities/users";

declare namespace Express{
    export interface Request{
        user: {
            id: string
        }
    }
}