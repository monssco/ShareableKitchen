import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";

/**
 * This is the user type that we get from the cognito via the ALB
 * It will have these basic values such as sub, username, exp and iss.
 * It will also have custom attributes if they are added into the userpool.
 */
type User = {
    sub: string;
    exp: number;
    iss: string;
}

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
    user?: User
};