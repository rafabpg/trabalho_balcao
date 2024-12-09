import CreateAnnouncementPage from "@/template/CreateAnnouncementPage"
import LayoutTemplate from "@/template/LayoutTemplate"
import Home from '@/pages/Home';
import MyAds from '@/pages/MyAds';
import LoginPage from "@/pages/LoginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdPage from "@/pages/AdPage";
import { AuthProvider } from "@/context/AuthContext";
const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/" element={<LayoutTemplate />}>
            <Route index element={<Home />} />
            <Route path="/meus-anuncios" element={<MyAds />} />
            <Route path="criar-anuncios" element={<CreateAnnouncementPage/>}/>
            <Route path="anuncio/:adId" element={<AdPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
