import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ShopProvider } from "./store/ShopContext";
import { PromoTicker, Header, Footer, ToastHost, CookieBanner, RetentionModal, ScrollFeeMeter } from "./components/chrome";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Loyalty from "./pages/Loyalty";
import Authors from "./pages/Authors";
import Bestsellers from "./pages/Bestsellers";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ScrollToTop />
        <PromoTicker />
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/bestsellers" element={<Bestsellers />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <ScrollFeeMeter />
        <ToastHost />
        <CookieBanner />
        <RetentionModal />
      </ShopProvider>
    </BrowserRouter>
  );
}
