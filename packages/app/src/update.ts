import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { User, cafe } from "server/models";

export default function update(
    message: Msg,
    apply: Update.ApplyMap<Model>,
    user: Auth.User
){
    switch(message[0]){
        case "user/select":
            selectProfile(message[1], user).then((profile) =>
            apply((model) => ({...model, profile}))
            );
            break;
        case "cafe/select":
            selectCafe(message[1]).then((cafe) =>
            apply((model) => ({...model, cafe}))
            );
            break;
        case "user/save":
            saveProfile(message[1], user)
            .then((user) =>
            apply((model) => ({...model, user}))
            )
            .then(() => {
                const{onSuccess} = message[1];
                if(onSuccess) onSuccess();
            })
            .catch((error:Error) => {
                const{onFailure} = message[1];
                if(onFailure) onFailure(error);
            });
            break;
        default:
            const unhandled: never = message[0];
            throw new Error(`Unhandled Auth message "${unhandled}"`);
    }
}

function selectCafe(msg: { cafeName: string}){
    return fetch(`/api/cafe/${msg.cafeName}`)
    .then((response: Response) => {
        if((response.status === 200) {
            return response.json();
        }
        return undefined;
    })
    .then((json: unknown) => {
        if(json){
            console.log("Cafe:", json);
            return json as cafe;
        }
    });
}

function selectProfile(msg: { userid: string}, user: Auth.User){
    return fetch(`/api/users/${msg.userid}`, {headers: Auth.headeres(user)})
    .then((response: Response) => {
        if(response.status === 200) {
            return response.json();
        }
        return undefined;
    })
    .then((json: unknown) => {
        if(json){
            console.log("Profile:", json);
            return json as User;
        }
    });
}

function saveProfile(
    msg:{
        userid: string;
        profile: User;
    },
    user: Auth.User
){
    return fetch(`/api/user/${msg.userid}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.profile)
    })
    .then((response: Response) => {
        if(response.status === 200) return response.json();
        else
            throw new Error(
                `Failed to save profile for ${msg.userid}`
            );
    })
    .then((json: unknown) => {
        if(json) return json as User;
        return undefined;
    });
}

