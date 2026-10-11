import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";

import {
  LanguageProvider,
} from "./context/LanguageContext";

import {
  ShopProvider,
} from "./context/ShopContext";

import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

function ShopFlowApp() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#090b0d] text-white">
        <ScrollToTop />
        
        <Header />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/account"
            element={<Account />}
          />

          <Route
            path="/home"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>

        <Footer />

        <CartDrawer />

        <Toast />
      </div>
    </ShopProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ShopFlowApp />
    </LanguageProvider>
  );
}

export default App;