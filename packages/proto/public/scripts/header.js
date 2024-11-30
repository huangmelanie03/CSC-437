import {
    css,
    define,
    html,
    shadow,
    Dropdown,
    Events
  } from "@calpoly/mustang";
  import reset from "./styles/reset.css.js";
  
  export class HeaderElement extends HTMLElement {
    static uses = define({
      "mu-dropdown": Dropdown.Element
    });
  
    static template = html`<template>
      <a slot = "actuator">
        Hello,
        <span id = "userid"></span>
      </a>
    </template>`;
  
    static styles = css`
      :host {
        display: contents;
      }
      header {
        --color-link: var(--color-link-inverted);
  
        display: flex;
        flex-wrap: wrap;
        align-items: bottom;
        justify-content: space-between;
        padding: var(--size-spacing-medium);
        background-color: var(--color-background-header);
        color: var(--color-text-inverted);
      }
      header ~ * {
        margin: var(--size-spacing-medium);
      }
      nav {
        display: flex;
        flex-direction: column;
        flex-basis: max-content;
        align-items: end;
      }
    `;

    get userid(){
      return this._userid.textContent;
    }

    set userid(id){
      if(id === "anonymous"){
        this._userid.textContent = "";
        this._signout.disabled = true;
      } else{
        this._userid.textContent = id;
        this._signout.disabled = false;
      }
    }
  
    constructor() {
      super();
      shadow(this)
        .template(HeaderElement.template)
        .styles(
          reset.styles,
          HeaderElement.styles
        );
  
      const dm = this.shadowRoot.querySelector(
        ".dark-mode-switch"
      );
  
      dm.addEventListener("change", (event) =>
        Events.relay(event, "dark-mode", {
          checked: event.target.checked
        })
      );

      this._signout = this.shadowRoot.querySelector("#signout");

      this._signout.addEventListener("click", (event)=>
        Events.relay(event, "auth:message", [auth/signout])
      );
    }

    _authObserver = new this._authObserver(this, "cafes:auth");

    connectedCallback(){
      this._authObserver.observe(({user})=>{
        if(user && user.username !== this.userid){
          this.userid = user.username;
        }
      });
    }
  
    static initializeOnce() {
      function toggleDarkMode(page, checked) {
        page.classList.toggle("dark-mode", checked);
      }
  
      document.body.addEventListener("dark-mode", (event) =>
        toggleDarkMode(event.currentTarget, event.detail.checked)
      );
    }
  }