import React from "react";
import styles from "./FavoriteProducts.module.css";
import { HiOutlineHeart, HiOutlineStar, HiOutlineTrash } from "react-icons/hi";
import { useProduct } from "../../context/ProductContext";
import { NavLink } from "react-router-dom";
import { shortText } from "../../utils/helper";

function FavoriteProducts() {
  const { favoriteProducts, dispatch } = useProduct();

  return (
    <div className={styles.container}>
      <div className={styles.favoriteBox}>
        <div className={styles.header}>
          <HiOutlineStar />
          <span>Favorites</span>
        </div>
        <ul className={styles.favoriteList}>
          {!favoriteProducts.length ? (
            <img
              className="notProductImage"
              src="../../public/images/shopping-bag-heart.png"
              alt="shopping-bag-heart"
            />
          ) : (
            favoriteProducts.map((item) => (
              <FavoriteCart
                key={item.id}
                product={item}
                dispatch={dispatch}
                favoriteProducts={favoriteProducts}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default FavoriteProducts;

const FavoriteCart = ({ product, dispatch, favoriteProducts }) => {
  const {
    id,
    image,
    title,
    rating: { rate, count },
  } = product;

  return (
    <li className={styles.favItem}>
      <NavLink to={`/products/${id}`} className={styles.imgContainer}>
        <img src={image} alt="" />
      </NavLink>
      <div className={styles.infoProduct}>
        <p className={styles.title}>{shortText(title)}</p>
        <div className={styles.rating}>
          <p>
            <HiOutlineStar />
            <span>{rate}</span>
          </p>
          <p>
            <HiOutlineHeart />
            <span>{count}</span>
          </p>
        </div>
      </div>
      <button
        onClick={() => dispatch({ type: "FAVORITES_REMOVE", payload: product })}
      >
        <HiOutlineTrash />
      </button>
    </li>
  );
};
