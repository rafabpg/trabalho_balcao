import CreateAnnouncementPage from "@/template/CreateAnnouncementPage"
import LayoutTemplate from "@/template/LayoutTemplate"
import Home from '@/assets/pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/" element={<LayoutTemplate />}>
          <Route index element={<Home />} />
          <Route path="criar-anuncios" element={<CreateAnnouncementPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
