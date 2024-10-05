import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${props => props.theme['green-500']} ; // 0 eixo x , 0 eixo y , 0 blur , 2px de Spread
    }

  body {
    background-color: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serfif // font-weight: 400  , font-size: 1rem , font-family: 'Roboto', sans-serif
  }
`