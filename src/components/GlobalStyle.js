import { createGlobalStyle } from "styled-components";

//import imaes
import bg from "../assets/img/bg.png";

const GlobalStyle = createGlobalStyle`
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}
body{
min-height: 100vh;
background-image: url(${bg});
}

`;

export default GlobalStyle;
