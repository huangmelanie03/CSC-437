import {Auth, Observer} from "@calpoly/mustang";
import {css, html, LitElement} from "lit";
import {state} from "lit/decorators.js";
import {cafes} from "server/models";
 
export class HomeViewElement extends LitElement{
    src = "/api/cafes";

    @state()
    cafeIndex = new Array<cafes>();

    _authObserver = new Observer<Auth.Model>(
        this,
        "cafe:auth"
    );

    _user = new Auth.User();

    connectedCallback(){
        super.connectedCallback();
        this._authObserver.observe(({user})=>{
            if(user){
                this._user = user;
            }
            this.hydrate(this.src);
        });
    }

    hydrate(url: string){
        fetch(url, {
            headers: Auth.headers(this._user)
        })
        .then((res: Response)=>{
            if(res.status === 200) return res.json();
            throw `Server responsed with status ${res.status}`;
        })
        .then((json: unknown)=>{
            if(json){
                console.log("cafes:", json);
                //const{data} = json as {data: Array<cafes>};
                this.cafeIndex = json as Array<cafes>;
            }
        })
        .catch((err)=>
            console.log("Failed to cafe data:", err)
        );
    }

    render(){
        const cafeList = this.cafeIndex.map(this.renderItem);

        return html`
        <main class = "page">
        <header>
        <h2> Your cafes</h2>
        </header>
        <dl>${cafeList}</dl>
        </main>
        `;
    }

    renderItem(Cafes: cafes){
        const{name} = Cafes;
        return html`
        <div class = "row">
            <dd>
                ${name}
            </dd>
        </div>  
        `;
    }

    static styles = [
        css`
        :host{
            display: grid;
            grid-column: 1 / -1;
        }

        .page{
            align-items: center;
        }

        dl{
            display: block;
            width: 100%;
            border: solid;
        }
        `
    ];
}