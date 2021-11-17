import { memo, VFC } from "react"
import { Route, Routes } from "react-router-dom"

import { Login } from "../components/pages/Login"
import { Home } from "../components/pages/Home";
import { Show } from "../components/pages/Show";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";


export const Router: VFC = memo(() => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HeaderLayout><Home /></HeaderLayout>} />
        <Route path="/show" element={<HeaderLayout><Show /></HeaderLayout>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
  );
});