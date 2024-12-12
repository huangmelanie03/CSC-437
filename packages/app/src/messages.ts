import { User } from "server/models";

export type Msg =
  | ["user/select", { userid: string }]
  | ["user/save", { userid: string, user: User }];