import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

// Router list defined by AT3K
import RouterList from '../AT3K/pages/RouterList';

import defaultTheme from "../AT3K/themes/default";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const globalTheme = defaultTheme;

export default function App() {
  const [theme, replaceTheme] = useState(globalTheme);
  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <BrowserRouter>
        <RouterList currTheme={theme} replaceTheme={replaceTheme} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
