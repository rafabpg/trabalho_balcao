import CreateAnnouncementPage from "@/template/CreateAnnouncementPage"
import LayoutTemplate from "@/template/LayoutTemplate"
import Home from '@/pages/Home';
import MyAds from '@/pages/MyAds';
import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdPage from "@/pages/AdPage";
import ProfileTemplate from "@/template/ProfileTemplate";
import ProfileDisplay from "@/components/Molecules/ProfileDisplay";
import ProfileEdition from "@/components/Molecules/ProfileEdition";
import UserChats from "@/components/Molecules/UserChats";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<LayoutTemplate />}>
          <Route path="meu-perfil" element={<ProfileTemplate />}>
            <Route index element={<ProfileDisplay />} />
            <Route path="editar" element={<ProfileEdition />} />
            <Route path="chats" element={<UserChats />} />
          </Route>
          <Route index element={<Home />} />
          <Route path="meus-anuncios" element={<MyAds />} />
          <Route path="criar-anuncios" element={<CreateAnnouncementPage/>}/>
          <Route path="anuncio/:adId" element={<AdPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
