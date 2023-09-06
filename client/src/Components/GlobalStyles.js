import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
        box-sizing: border-box;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    html {
        @media only screen and (max-width: 1000px) {
            font-size: 14px;
        }

        @media only screen and (max-width: 650px) {
            font-size: 12px;
        }

        @media only screen and (max-width: 500px) {
            font-size: 10px;
        }
    }
    #root {
        max-width: 100vw;
        min-height: 100vh;
        width: 100vw;
        background-color: #F8F6EF;

        @media only screen and (max-width: 850px) {
            font-size: 110px;
        }

        @media only screen and (max-width: 650px) {
            font-size: 80px;
        }

        @media only screen and (max-width: 500px) {
            font-size: 70px;
        }
    }
    body {
        line-height: 1;
        font-family: "rubik";
        min-height: 100vh;
        width: 100vw;
        background-color: #F8F6EF;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    input, button, select {
        &:focus {
            outline: none;
            border: 1px solid white;
            filter: brightness(1.05);
        } 
    }
    label {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        white-space: nowrap;
        border: none;
        visibility: hidden;
    }
`;

export default GlobalStyles;