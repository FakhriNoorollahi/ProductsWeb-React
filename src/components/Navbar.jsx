import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFavorite } from "react-icons/gr";
import { TbHome } from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";
import { countCarts } from "../utils/helper";

function Navbar() {
  const { carts } = useCart();
  const { favoriteProducts, category, search, handleSearch, handleCategory } =
    useProduct();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") navigate("/products");

  const goToHome = (e) => {
    e.preventDefault();
    handleCategory(category);
    handleSearch(search);
    navigate(`/products`);
  };

  return (
    <div
      className={`header ${
        location.pathname !== "/products" && "header-style"
      }`}
    >
      <p>Store Website</p>
      <nav>
        <ul>
          <li>
            <NavLink to="/favorite" style={{ width: "100px" }}>
              <GrFavorite />
              <span>Favorite</span>
            </NavLink>
            {favoriteProducts.length ? (
              <span className="notification">{favoriteProducts.length}</span>
            ) : (
              ""
            )}
          </li>
          <li>
            <NavLink to="/checkout">
              <AiOutlineShoppingCart />
              <span>Bag</span>
            </NavLink>
            {carts.length ? (
              <span className="notification">{countCarts(carts)}</span>
            ) : (
              ""
            )}
          </li>
          <li>
            <NavLink onClick={goToHome}>
              <TbHome />
              <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
