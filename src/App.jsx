import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import FavoritePage from "./pages/FavoritePage";
import Layout from "./pages/Layout";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<SingleProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
