import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/ModalProvider";

function App(props: any) {
  console.log("test");



  // useEffect(() => {
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     user && navigate("/");
  //   });
  //   return () => unSub();
  // }, [navigate]);

  return (
    <ChakraProvider theme={theme}>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </ChakraProvider>
  );
}

export default App;
