import LayoutTemplate from "@/template/LayoutTemplate"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import AdPage from "@/pages/AdPage"
import Button from "@/components/Button"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}>
            </Route>
            
            
            <Route path="/anuncio/:adId" element={<AdPage />}></Route>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes