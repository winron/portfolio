import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        font-family: "Rubik", sans-serif;
    }
    html {
        scroll-behavior: smooth;
        scroll-restoration: manual;
    }
    body {
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.color};
        min-height: 100vh;
        width: 100%;
        overflow-x: hidden;
        font-size: 16px;
        transition: background-color 0.3s, color 0.3s;
    }
    
`;

export default GlobalStyles;