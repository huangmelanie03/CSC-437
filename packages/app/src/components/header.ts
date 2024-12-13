import { Auth, define, Dropdown, Events, Observer} from "@calpoly/mustang";
import { LitElement, css, html } from "lit";

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;
    const checked = target.checked;

    Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
    Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class HeaderElement extends LitElement {
    static uses = define({
        "drop-down": Dropdown.Element
    });

  render() {
     return html`
        <header>
            <div class="top_bar">
                <h1>
                    <a href="/">The Cozy Cup</a>
                </h1>

                <drop-down>
                    <a slot="actuator">
                        <h3 id="userid"></h3>
                    </a>

                    <menu>
                        <li class="when-signed-out">
                            <a href="/login">Sign In</a>
                        </li>

                        <li class="when-signed-in">
                            <a href="/users/">Profile</a>
                        </li>
                        <li class="when-signed-in">
                            <a id="signout" @click=${signOut}>Sign Out</a>
                        </li>
                    </menu>
                </drop-down>
            </div>
            <div class="nav_bar">
                <ul>
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="/cafe/cafes.html">Cafes</a>
                    </li>
                    <li>
                        <a href="/about/about.html">About Us</a>
                    </li>
                </ul>

                <label @change=${toggleDarkMode}>
                    <input type="checkbox" autocomplete="off" />
                    Dark Mode
                </label>
            </div>
        </header>`;
  }

  static styles = css`
  :host {
    display: contents;
    position: sticky;
  }
  header{
    color: white;
  }
  .top_bar, .nav_bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    background-color: #8e5200;
    font-family: 'Baloo Paaji 2', arial, serif;
  }
  .top_bar h1 a, .nav_bar a{
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  .top_bar h1{
    margin: 0;
    font-size: 1.5em;
  }
  .nav_bar ul{
    display: flex;
    list-style-type: none;
    padding: 5px 20px;

  }
  .nav_bar ul li{
    margin-right: 1.5em;
  }
  .nav_bar ul li:last-child{
    margin-right: 0;
  }
  .nav_bar a{
    text-decoration: none;
    color: white;
  }
  label{
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: white;
  }
  input[type="checkbox"]{
    font-family: 'Baloo Paaji 2', arial, serif;
  }
  a:hover{
    text-decoration: underline;
}



`



  _authObserver = new Observer(this, "cafe:auth");
  _user = new Auth.User();

  static initializeOnce(){
    function toggleDarkMode(page: HTMLElement, checked: boolean) {
        page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event)=>
    toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked)
    );
  }

}