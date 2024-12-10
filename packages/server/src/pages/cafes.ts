import { css, html } from "@calpoly/mustang/server";
import { cafes} from "../models/cafes";

import renderPage from "./renderPage"; // generic page renderer

export class CafesPage {
  data: cafes;

  constructor(data: cafes) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      stylesheets:["/styles/page.css"],
      scripts:[
        `import {define} from "@calpoly/mustang";
        import { CafeInfoElement } from "/scripts/cafe-info.js";
        import { HeaderElement } from "/scripts/header.js";
        define({
          "cafe-info": CafeInfoElement,
          "cafe-header": HeaderElement,
        });
        HeaderElement.initializeOnce();
        CafeInfoElement.initializeOnce();
        `
      ]
    });
  }

  renderCafe(cafe:cafes) {
    const {name, rating,
      numbers,
      hours,
      address} = cafe;

    return html` 
    <cafe-info>
        <span slot="rating">${rating}</span>
        <span slot="numbers">${numbers}</span>
        <span slot="cafe-hours">${hours}</span>
        <span slot="cafe-address">${address}</span>
    </cafe-info>`;
  }


  renderBody() { 
    const { name, rating, numbers, hours, address } = this.data; 
    return html` 
    <body> 
      <main class="page"> 
        <section class="cafe"> 
          <header> 
            <h2>${name}</h2> 
          </header> 
          ${this.renderCafe(this.data)}
        </section> 
      </main>
    </body> 
  `;
  }
}
