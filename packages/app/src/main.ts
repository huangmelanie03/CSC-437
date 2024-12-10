import { Auth, define } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { HeaderElement } from "./components/header";
import { HomeViewElement} from "./views/home-view";

class AppElement extends LitElement {
    static uses = define({
        "home-view":HomeViewElement
    });

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
    "cafe-app": AppElement,
    "cafe-header": HeaderElement
});