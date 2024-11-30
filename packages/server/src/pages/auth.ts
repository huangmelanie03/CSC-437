import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage"; // generic page renderer

export class LoginPage{
    render(){
        return renderPage({
            scripts: [
                `
                import{define, Auth} from "@calpoly/mustang";
                import{LoginForm} from "/scripts/login-form.js";
                
                define({
                    "mu-auth": Auth.Provider,
                    "login-form":LoginForm
                })`
            ],
            styles:[
                css`
                /* insert css */
                `
            ],
            body:html`
            <body>
                <mu-auth provides= "cafes:auth">
                    <article>
                        <cafe-header><cafe-header>
                        <main class = "page">
                            <login-form api = "/auth/login">
                                <h3 slot = "title">Your coffee community awaits—log in to caffeinate your day!</h3>
                            </login-form>
                            <p class = "register">
                                or
                                <a href="./register">
                                    Brew a new adventure—sign up to discover cozy cafes
                                </a>
                                !
                            </p>
                        </main>
                    </article>
                </mu-auth>
            </body>
            `
        });
    }
}