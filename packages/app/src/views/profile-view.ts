import{ define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class ProfileView extends View<Model, Msg>{
    @property()
    userid?: string;

    @state()
    get profile():User|undefined{
        return this.model.profile;
    }

    constructor(){
        super("cafes:model");
    }

    render(){
        if(!this.profile){
            return html`<p>Loading profile...</p>`;
        }

        const {name} = this.profile;
        
        return html`
        <main class = "page">
            <div class = "user_overview">
                <h2>Welcome, ${name}</h2>
                <p>Your User ID: ${this.userid}</p>
            </div>

            <div class = "user_details">
                <p><strong>Name:</strong> ${name}</p>
            </div>

            <div class = "actions">
                <button @click=${this.editProfile}>Edit Profile</button>
                <button @click=${this.logout}>Logout</button>
            </div>
        </main>
        `;
    }

    editProfile(){
        console.log("Edit profile clicked!");
    }

    logout(){
        console.log("Logout clicked!");
        this.dispatchEvent(
            new CustomEvent<Msg>("cafe:logout", {bubbles: true, composed: true})
        );
    }

}