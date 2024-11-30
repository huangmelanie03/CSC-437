import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";


export class CafeInfoElement extends HTMLElement{
    static template = html` <template> 
            <h2>
                <slot name="rating"></slot>
            </h2>
            <dl>
                <dt>
                    <span>Phone Number: </span>
                </dt>
                <dd><slot name="numbers"></slot></dd>
                <dt>
                    <span>Hours: </span>
                </dt>
                <dd><slot name="cafe-hours"></slot></dd>
                <dt>
                    <span>Address: </span>
                </dt>
                <dd><slot name="cafe-address"></slot></dd>
            </dl>
        </template>
    `;

    static styles = css`
        h2{
            color: var(--color-text);
            font-size: 1.3em;
        }

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
            .template(CafeInfoElement.template)
            .styles(CafeInfoElement.styles);
    }
}

_authObserver = new Observer(this, "cafes:auth");

get authorization(){
    return(
        this._user?.authenticated &&{
            Authorization: `Bearer ${this._user.token}`
        }
    );
}

connectedCallback(){
    this._authObserver.observe(({user})=>{
        this._user = user;
    });
    //if (this.src) this.hydrate(this.src);
}

fetch(url, {headers: this.authorization}).then((res)=>{
    //handle the response
});

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