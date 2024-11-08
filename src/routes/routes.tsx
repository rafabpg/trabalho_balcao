import LayoutTemplate from '@/template/LayoutTemplate';
import Home from '@/assets/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutTemplate />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
