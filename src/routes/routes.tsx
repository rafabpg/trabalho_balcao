import CreateAnnouncementPage from "@/template/CreateAnnouncementPage";
import LayoutTemplate from "@/template/LayoutTemplate";
import Home from "@/pages/Home";
import MyAds from "@/pages/MyAds";
import LoginPage from "@/pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdPage from "@/pages/AdPage";
import { AuthProvider } from "@/context/AuthContext";
import ProfileTemplate from "@/template/ProfileTemplate";
import ProfileDisplay from "@/components/Organisms/ProfileDisplay";
import ProfileEdition from "@/components/Organisms/ProfileEdition";
import ProfileChats from "@/components/Organisms/ProfileChats";
import PageNotFound from "@/pages/PageNotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LayoutTemplate />}>
            <Route path="meu-perfil" element={<ProfileTemplate />}>
              <Route index element={<ProfileDisplay />} />
              <Route path="editar" element={<ProfileEdition />} />
              <Route path="chats" element={<ProfileChats />} />
            </Route>
            <Route index element={<Home />} />
            <Route path="meus-anuncios" element={<MyAds />} />
            <Route path="criar-anuncios" element={<CreateAnnouncementPage />} />
            <Route path="anuncio/:adId" element={<AdPage />} />
            <Route path="*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
