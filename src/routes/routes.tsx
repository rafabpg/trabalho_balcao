import CreateAnnouncementPage from "@/template/CreateAnnouncementPage"
import LayoutTemplate from "@/template/LayoutTemplate"
import Home from '@/assets/pages/Home';
import MyAds from '@/assets/pages/MyAds';
import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdPage from "@/pages/AdPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/" element={<LayoutTemplate />}>
          <Route index element={<Home />} />
          <Route path="/meus-anuncios" element={<MyAds />} />
          <Route path="criar-anuncios" element={<CreateAnnouncementPage/>}/>
          <Route path="anuncio/:adId" element={<AdPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
