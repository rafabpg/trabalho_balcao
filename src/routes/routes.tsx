import LayoutTemplate from "@/template/LayoutTemplate"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>}>
                
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes