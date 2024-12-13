import { User } from "server/models";

export type Msg =
  | ["user/save", { userid: string;
                        profile: User;
                        onSuccess?:() => void;
                        onFailure?: (err:Error) => void;
                     }
    ]
  | ["user/select", { userid: string }];