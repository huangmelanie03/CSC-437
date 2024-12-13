import {Auth, Observer} from "@calpoly/mustang";
import {css, html, LitElement} from "lit";
import {state} from "lit/decorators.js";
import {cafes} from "server/models";
import { define } from "../../../../node_modules/@calpoly/mustang/dist/mustang";
 
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

    featuredCafes = [
        {name: "Philz Coffee", image: "philzcoffee.jpeg", link: "packages/app/philzcoffee.jpeg"},
        {name: "Nautical Bean", image: "nautibean.jpeg", link: "packages/app/nautibean.jpeg"},
        {name: "Kaffein Coffee Company", image: "kaffeinimg.jpeg", link: "packages/app/kaffeinimg.jpeg"},
        {name: "Scout Coffee", image: "scoutimg.jpeg", link: "packages/app/scoutimg.jpeg"},
    ];


    render(){
        return html`
        <main class = "page">
        <img
            class="logo"
            src="THe_Cozy_Cup-removebg-preview.png"
            alt="The Cozy Cup Logo"
        />
        <h1>The Cozy Cup</h1>
        <p class="welcome-text">
        Welcome to The Cozy Cup! 
        Whether you are a coffee enthusiast, a pastry lover, or simply in search of the perfect spot to unwind, we’ve got you covered. Our mission is to help you discover the best cafes around, from hidden gems to popular local favorites. 
        Browse honest reviews, cozy atmospheres, and must-try menu items that make each cafe unique. Join us in exploring the world of coffee culture one cup at a time, and find your next go-to cafe right here. 
        Sip, savor, and share your experiences with us!
        </p>
        <section class = "featured-section">
            <h2 class = "featured-title">Featured Cafes</h2>
            <ul class = "featured-list">
                ${this.featuredCafes.map((cafe) => this.renderItem(cafe))}   
            </ul>
        </section>
        </main>
        `;
    }

    renderItem(cafe: {name: string; image: string; link: string}){
        return html`
        <li class = "featured-item">
            <img src="${cafe.image}" alt="${cafe.name}"/>
            <a href="${cafe.link}">${cafe.name}</a>
        </li> 
        `;
    }

    static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
      color: #4a4a4a;
      background-color: #fae9d4;
    }

    .page {
      text-align: center;
      margin: 0 auto;
      max-width: 800px;
    }

    .logo {
      margin: 20px auto;
      width: 150px;
      height: auto;
    }

    .welcome-text {
      margin: 24px 0;
      font-size: 1.2rem;
      line-height: 1.6;
    }

    .featured-section {
      margin-top: 32px;
      text-align: left;
    }

    .featured-title {
      font-size: 1.5rem;
      color: #9a6636;
      margin-bottom: 16px;
    }

    .featured-list {
      list-style: none;
      padding: 0;
    }

    .featured-item {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }

    .featured-item img {
      max-width: 100px;
      height: auto;
      margin-right: 16px;
      border-radius: 8px;
    }

    .featured-item a {
      font-size: 1rem;
      color: #9a6636;
      text-decoration: none;
    }

    .featured-item a:hover {
      text-decoration: underline;
    }
  `;
}