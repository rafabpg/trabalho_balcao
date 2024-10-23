import LayoutTemplate from "@/template/LayoutTemplate"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LayoutTemplate/>}>
                
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes