import CreateAnnouncementPage from "@/template/CreateAnnouncementPage";
import LayoutTemplate from "@/template/LayoutTemplate";
import Home from "@/pages/Home";
import MyAds from "@/pages/MyAds";
import LoginPage from "@/pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdPage from "@/pages/AdPage";

import RatingModal from "@/components/Organisms/RatingModal";
import ProfileTemplate from "@/template/ProfileTemplate";
import ProfileDisplay from "@/components/Organisms/ProfileDisplay";
import ProfileEdition from "@/components/Organisms/ProfileEdition";
import ProfileChats from "@/components/Organisms/ProfileChats";
import ProtectedRoute from "./ProtectedRoute";



const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute element = {<LayoutTemplate />}/>}>
          <Route path="meu-perfil" element={<ProtectedRoute element = {<ProfileTemplate />}/>}>
            <Route index element={<ProtectedRoute element = {<ProfileDisplay />}/>} />
            <Route path="editar" element={<ProtectedRoute element = {<ProfileEdition />}/>} />
            <Route path="chats" element={<ProtectedRoute element = {<ProfileChats />}/>} />
          </Route>
          <Route index element={<ProtectedRoute element = {<Home />}/>} />
          <Route path="meus-anuncios" element={<ProtectedRoute element = {<MyAds />}/>} />
          <Route path="criar-anuncios" element={<ProtectedRoute element = {<CreateAnnouncementPage />}/>} />
          <Route path="anuncio/:adId" element={<ProtectedRoute element = {<AdPage />}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
