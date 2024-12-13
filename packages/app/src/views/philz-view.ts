import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

export class PhilzView extends View<Model,Msg> {
    @property()
    render() {
        return html`
            <main>
                <section class="header">
                    <h1>Philz Coffee</h1>
                </section>
                <section class="image-section">
                    <img src="/assets/images/philz-coffee.jpg" alt="Philz Coffee" />
                </section>
                <section class="details">
                    <div class="rating">
                        <p><strong>3.9/5.0</strong></p>
                    </div>
                    <div class="info">
                        <h2>Phone Number</h2>
                        <p>(510) 980-9690</p>
                        
                        <h2>Hours</h2>
                        <p>
                            Monday: 5:30am–8pm<br />
                            Tuesday: 5:30am–8pm<br />
                            Wednesday: 5:30am–8pm<br />
                            Thursday: 5:30am–8pm<br />
                            Friday: 5:30am–8pm<br />
                            Saturday: 6am–8pm<br />
                            Sunday: 6am–8pm
                        </p>

                        <h2>Address</h2>
                        <p>3359 Castro Valley Blvd, Castro Valley, CA 94546</p>
                        
                        <div class="links">
                            <a href="/reviews">Reviews</a>
                            <a href="/menu">Menu</a>
                            <a href="/photos">Photos</a>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
    static styles = css`
        main {
            font-family: "Arial", sans-serif;
            background-color: #fdf1e7;
            color: #3c2e2e;
            padding: 20px;
            max-width: 900px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 2.5em;
            font-weight: bold;
        }

        .image-section img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }

        .details {
            margin-top: 20px;
            line-height: 1.8;
        }

        .rating {
            font-size: 1.5em;
            font-weight: bold;
            text-align: left;
            margin-bottom: 20px;
        }

        .info h2 {
            font-size: 1.2em;
            margin: 10px 0;
            color: #663300;
        }

        .info p {
            font-size: 1em;
            margin: 5px 0;
        }

        .links {
            margin-top: 20px;
        }

        .links a {
            margin-right: 15px;
            text-decoration: none;
            color: #b26c39;
            font-weight: bold;
        }

        .links a:hover {
            text-decoration: underline;
        }
    `;
}

define("philz-view", PhilzView);
