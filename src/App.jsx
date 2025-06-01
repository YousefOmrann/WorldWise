import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pagenotfound from "./pages/Pagenotfound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Pricing from "./pages/pricing";
import Product from "./pages/product";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";

import CountryList from "./components/CountryList";
import { CitiesProvider } from "./contexts/CitiesContext";
function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
