import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.bg_main1};
    color: ${({ theme }) => theme.text1};
    font-family:  Helvetica, sans-serif;
  }
`;
