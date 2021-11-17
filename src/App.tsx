import React,{ useEffect } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";


function App(props: any) {

  // useEffect(()=> {
  //   const unSub = onAuthStateChanged((auth, (user)=>{
  //    if (user)
  //   }));
  //   return () => unSub()
  // })
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
