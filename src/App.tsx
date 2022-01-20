import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { ModalProvider } from "./providers/ModalProvider";
import { UserProvider } from "./providers/UserProvider";

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
        <UserProvider>
          <Router />
        </UserProvider>
      </ModalProvider>
    </ChakraProvider>
  );
}

export default App;
