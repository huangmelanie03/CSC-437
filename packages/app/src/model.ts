import { cafes, User } from "server/models";

export interface Model{
    Cafe?:cafes;
    profile?:User;
}

export const init: Model = {};