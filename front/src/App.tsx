import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { theme } from "./theme/theme";

function App() {
    return (
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    );
  }

export default App;