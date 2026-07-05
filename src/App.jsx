import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetails from "@/pages/ProductDetails";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

import Overview from "@/pages/product-details/Overview";
import Reviews from "@/pages/product-details/Reviews";
import Specifications from "@/pages/product-details/Specifications";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/products/:id" element={<ProductDetails />}>
            <Route index element={<Overview />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="specifications" element={<Specifications />} />
          </Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp/>} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;