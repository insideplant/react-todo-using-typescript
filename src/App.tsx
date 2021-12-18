import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/ModalProvider";

function App(props: any) {
  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ModalProvider>
    </ChakraProvider>
  );
}

export default App;
