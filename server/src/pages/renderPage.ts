// src/pages/renderPage.ts
import {
    PageParts,
    renderWithDefaults
  } from "@calpoly/mustang/server";
  
  
  const defaults = {
    stylesheets: [
      "/styles/tokens.css",
      "/styles/page.css"
    ],
    styles: [],
    scripts: [
        `import { define } from "@calpoly/mustang";
        import { HeaderElement } from "/scripts/header.js";
        import { CafeInfoElement } from "/scripts/cafe-info.js";

        define({
            "cafe-header": HeaderElement,
            "cafe-info": CafeInfoElement
        });
  
        HeaderElement.initializeOnce();
        CafeInfoElement.initializeOnce();
        `
    ],
    googleFontURL:
      "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,700;1,700&family=Merriweather:wght@400;700&display=swap",
    imports: {
      "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
    }
  };
  
  export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, default