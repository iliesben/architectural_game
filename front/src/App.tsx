import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { theme } from "./theme/theme";
import { SocketContext, socket } from "./context/socket";

function App() {
    return (
      <ThemeProvider theme={theme}>
        <SocketContext.Provider value={socket}>
          <Router />
        </SocketContext.Provider>
      </ThemeProvider>
    );
  }

export default App;