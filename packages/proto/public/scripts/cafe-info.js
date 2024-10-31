import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class CafeInfoElement extends HTMLElement{
    static template = html`
        <template> 
            <h2><slot name="rating"></slot></h2>
            <dl>
                <dt>Phone Number</dt>
                <dd><slot name="phone"></slot></dd>
                <dt>Hours</dt>
                <dd><slot name="hours"></slot></dd>
                <dt>Address</dt>
                <dd><slot name="address"></slot></dd>
            </dl>
        </template>
    `;

    static style = css`
        dt{
            font-weight: bold;
        }
        
        dd{
            font-weight: normal;
            margin-left: 20px;
        }
    `;

    constructor(){
        super();
        shadow(this)
            template(CafeInfoElement.template)
            styles(CafeInfoElement.styles);
    }
}