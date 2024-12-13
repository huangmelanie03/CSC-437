import{ define, Form, History, InputArray, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { User } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";
import reset from "../styles/reset.css";

export class MemberEditElement extends View<Model, Msg>{
    static uses = define({
        "mu-form": Form.Element,
        "input-array": InputArray.Element
    });

    @property()
    userid?: string;

    @state()
    get profile(): User | undefined {
        return this.model.profile;
    }

    render(){
        return html`
        <main class = "page">
        <mu-form
            .init=${this.profile}
            @mu-form:submit=${this._handleSubmit}>
            <label>
                <span>User ID</span>
                <input name = "userid" />
            </label>
            <label>
                <span>Name</span>
                <input name = "name" />
            </label>
            <label>
                <span>Favorite Cafes</span>
                <input-array name = "favoriteCafes">
                    <span slot = "label-add">Add a favorite cafe</span>
                </input-array>
            </label>
        </mu-form>
        </main>
        `;
    }

    static style = [
        reset.styles,
        css`
            :host{
                display: contents;
                grid-column: 2/-2;
            }
            .page{
                --page-grids: 12;

                display: grid;
                grid-template-columns:
                    [start] repeat(var(--page-grids), 1fr)
                    [end];
                gap: var(--size-spacing-large)
                    var(--sive-spacing-medium);
                background-color: #fdf3e3;
                color: #5c3d2e;
                font-family: 'Baloo Paaji 2', arial, serif;
            }
            mu-form{
                display: grid;
                grid-column: 1/-1;
                grid-template-columns: subgrid;
                gap: var(--size-spacing-medium);
            }
            label{
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                gap: var(--size-spacing-small);
            }
            label span{
                font-weight: bold;
                color: #8b4513;
            }
            input{
                padding: 0.5em;
                border: 1px solid #d2a679;
                border-radius: 4px;
                font-size: 1em;
            }
            input:focus{
                outline: none;
                border-color: #f4a460;
            }
            input-array span{
                color: #8b4513;
                font-size: 0.9em;
            }
            `
    ];

    constructor(){
        super("cafe:model");
    }

    attributeChangeCallBack(
        name: string,
        old: string | null,
        value: string | null
    ){
        super.attributeChangedCallback(name, old, value);

        if(name === "userid" && old !== value && value)
            this.dispatchMessage([
                "profile/select",
                { userid: value }
            ]);
    }

    _handleSubmit(event: Form.SubmitEvent<User>){
        console.log("Submitting form", event);
        if(this.profile && this.userid){
            this.dispatchMessage([
                "profile/save",
                {
                    userid: this.userid,
                    profile: event.detail,
                    onSuccess: () =>
                        History.dispatch(this, "history/navigate", {
                            href: `/app/user/${this.userid}`
                        }),
                    onFailure: (err) => {
                        console.log("Error saving profile", err);
                    }
                }
            ]);
        }
    }
    
}