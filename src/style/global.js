import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --color-bg: #f1f5f9;
        --color-surface: #ffffff;
        --color-surface-elevated: #ffffff;
        --color-border: #e2e8f0;
        --color-border-strong: #cbd5e1;
        --color-text: #0f172a;
        --color-text-muted: #64748b;
        --color-accent: #0891b2;
        --color-accent-hover: #0e7490;
        --color-accent-soft: rgba(8, 145, 178, 0.12);
        --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
        --shadow-md: 0 4px 14px rgba(15, 23, 42, 0.08);
        --shadow-lg: 0 12px 40px rgba(15, 23, 42, 0.12);
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-pill: 999px;
        --font-ui: "Play", system-ui, sans-serif;
        --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: var(--font-ui);
    }

    body {
        background: var(--color-bg);
        color: var(--color-text);
        line-height: 1.5;
    }

    a {
        text-decoration: none;
    }

    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    textarea:focus-visible,
    select:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }
`;