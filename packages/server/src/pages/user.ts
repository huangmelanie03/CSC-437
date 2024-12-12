import { css, html } from "@calpoly/mustang/server";
import { User } from "../models/user";
import renderPage from "./renderPage";

export class UserPage {
    data: User | null;

    constructor(data: User | null) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody(),
            scripts: [
                `
            import { define, Auth } from "@calpoly/mustang";
            import { HeaderElement } from "/scripts/header.js";
            import { UserProfileElement } from "/scripts/user.js";
    
            define({
                "cafe-header": HeaderElement,
                "user-profile-element": UserProfileElement,
                "mu-auth": Auth.Provider,
            });

            HeaderElement.initializeOnce();
            `
            ],
            styles: [
            ]
        });
    }

    renderBody() {
        const base = "/api/users";
        const api = this.data
            ? `${base}/${this.data.username}`
            : base;

        // console.log(api)

        return html`<body>
          <mu-auth provides="lol:auth">
            <cafe-header></cafe-header>
            <main class="page">
                <user-profile-element src="${api}"> </user-profile-element>
            </main>
          </mu-auth>
        </body>`;
    }
}