import React from "react";
import styles from "./SingleProduct.module.css";
import { useCart } from "../../context/CartContext";
import { HiMinusSm, HiOutlineTrash, HiPlusSm } from "react-icons/hi";

function ProductButtons({ productDispatch, product, favoriteProducts }) {
  const { carts, dispatch: cartDispatch } = useCart();

  const isExistFav = favoriteProducts.find((item) => +item.id === +product.id);
  const foundCart = carts.find((item) => +item.id === +product.id);

  return (
    <div className={styles.buttons}>
      <button
        onClick={() => {
          productDispatch({
            type: isExistFav ? "FAVORITES_REMOVE" : "FAVORITES_ADD",
            payload: product,
          });
        }}
      >
        {isExistFav ? "Remove Favorit" : " Add Favorite"}
      </button>

      {foundCart ? (
        <CartButton product={foundCart} cartDispatch={cartDispatch} />
      ) : (
        <button
          onClick={() => {
            cartDispatch({ type: "ADD_CART", payload: product });
          }}
        >
          Add Cart
        </button>
      )}
    </div>
  );
}

export default ProductButtons;

function CartButton({ product, cartDispatch }) {
  return (
    <div className={styles.prouctsBtn}>
      <button
        className={styles.plusBtn}
        onClick={() => {
          cartDispatch({ type: "INC_CART", payload: product });
        }}
      >
        <HiPlusSm />
      </button>
      <span>{product.quantity}</span>
      {product.quantity > 1 ? (
        <button
          className={styles.minusBtn}
          onClick={() => {
            cartDispatch({ type: "DEC_CART", payload: product });
          }}
        >
          <HiMinusSm />
        </button>
      ) : (
        <button
          className={styles.deleteBtn}
          onClick={() =>
            cartDispatch({ type: "REMOVE_CART", payload: product.id })
          }
        >
          <HiOutlineTrash />
        </button>
      )}
    </div>
  );
}
