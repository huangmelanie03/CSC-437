import { History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class ReviwerViewElement extends View<Model, Msg> {
  @property()
  userid?: string;

  @state()
  get profile(): User | undefined {
    return this.model.profile;
  }

  render() {
    const {
      userid,
      name,
      favorites,
    } = this.profile || {};

    return html`
      <main class="page">
      <section class="view">
        <h1>${name}<h1>
        <dl>
            <dt>User ID</dt>
            <dd> ${userid}</dd>
            <dt>Favorite Cafes</dt>
            <dd>${favorites.join(", ")}</dd>
        </dl>
      </section>
      </main>
    `;
  }

  static styles = [
    reset.styles,
    css`
    :host {
      display: block;
      grid-column: 2 / -2;
      font-family: 'Arial', sans-serif;
      color: #4b3a32;
      background-color: #f6e4d9;
    }

    .page {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
      padding: 2rem;
    }

    section.view {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }

    h1 {
      font-size: 2rem;
      color: #623a2d;
      text-align: center;
    }

    dl {
      display: grid;
      grid-template-columns: max-content auto;
      row-gap: 0.5rem;
      column-gap: 1rem;
      margin: 1rem 0;
    }

    dt {
      font-weight: bold;
      color: #6b4226;
    }

    dd {
      margin: 0;
      color: #4b3a32;
    }
  `
  ];

  constructor() {
    super("blazing:model");
  }

  attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ) {
    super.attributeChangedCallback(name, old, value);

    if (name === "userid" && old !== value && value)
      this.dispatchMessage([
        "profile/select",
        { userid: value }
      ]);
  }
}