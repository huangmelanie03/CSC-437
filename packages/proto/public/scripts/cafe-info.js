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

connectedCallback(){
    if (this.src) this.hydrate(this.src);
}

hydrate(url){
    fetch(url)
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
}

renderSlots(json){
    const entries = Object.entries(json);
    const toSlot = ([key, value]) =>
      html`<span slot="${key}">${value}</span>`
  
    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
}
