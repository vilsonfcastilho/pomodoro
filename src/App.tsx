import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import { CyclesContextProvider } from './contexts/CyclesContext';

import { GlobalStyle } from './styles/global';
import { darkTheme } from './styles/themes/dark';

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
