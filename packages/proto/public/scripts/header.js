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
        <h1></h1>
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