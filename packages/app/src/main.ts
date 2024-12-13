import { Auth, History, Switch,Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/header";
import { HomeViewElement} from "./views/home-view";
import CafesView from "./views/cafes-view";
import CafeDetailsView from "./views/cafe-details-view";
import AboutView from "./views/about-view";
import LoginView from "./views/login-view";
import RegisterView from "./views/register-view";
import ProfileView from "./views/profile-view";
import PhilzView from "/Users/melaniehuang/Documents/GitHub/CSC-437/packages/app/src/views/philz-view";
import WriteReviewView from "./views/write-review-view";
import { Store } from "../../../node_modules/@calpoly/mustang/dist/mustang";

const routes = [
    {
        path: "/app/cafe/:id",
        view: (params:Switch.Params) => html`
        <cafe-view cafes-id = ${params.id}></cafe-view>`
    },
    {
        path:"/app/cafe",
        view:() => html`
        <landing-view></landing-view>`
    },
    {
        path:"/app/about",
        view: () => html`
        <about-view></about-view>`
    },
    {
        path:"/app/users/:userId",
        view: (params: Switch.Params) => html`
        <profile-view user-id="${params.userId}"></profile-view>`
    },
    {
        path: "/app/login",
        view: () => html`
        <login-view></login-view>`
    },
    {
        path: "/app/register",
        view:() => html`
        <register-page></register-page>`
    },
    {
        path: "/write-review/:id",
        view: (params: Switch.Params) => html`
        <write-review-page cafe-id="${params.id}"></write-review-page>`
    },
    {
        path: "/app/",
        view: () => html`
        <home-view></home-view>
      `
    },
    {
        path: "/app",
        view: () => html`<home-view></home-view>`
    },
    {
        path: "/app/cafes/philz",
        view: () => html`<philz-view></philz-view>`
    },
];

class AppElement extends LitElement {
    protected render(){
        return html`
        <home-view></home-view>
        `;
    }

    connectedCallback():void{
        super.connectedCallback();
        HeaderElement.initializeOnce();
    }
}

define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "mu-store": class AppStore extends Store.Provider<Model,Msg>{
        constructor(){
            super(update, init, "cafe:auth");
        }
    },
    "mu-switch": class AppSwitch extends Switch.Element{
        constructor(){
            super(routes, "cafe:history", "cafe:auth");
        }
    },
    "cafe-app": AppElement,
    "cafe-header": HeaderElement,
    "cafes-view": CafesView,
    "cafe-details-view": CafeDetailsView,
    "about-view": AboutView,
    "login-view": LoginView,
    "register-view": RegisterView,
    "profile-view": ProfileView,
    "write-review-view": WriteReviewView,
    "home-view": HomeViewElement,
    "philz-view": PhilzView
});