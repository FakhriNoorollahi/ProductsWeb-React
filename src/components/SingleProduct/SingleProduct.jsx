import React, { useEffect } from "react";
import styles from "./SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import ProductButtons from "./ProductButtons";
import Loader from "../../ui/Loader";

function SingleProduct() {
  const { id } = useParams();
  const { dispatch, currentProduct, favoriteProducts } = useProduct();

  useEffect(() => {
    dispatch({ type: "CURRENT_PRODUCT", payload: +id });
  }, [id]);

  if (!id) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={currentProduct.image} alt="" />
      </div>
      <div className={styles.information}>
        <h2>{currentProduct.title}</h2>
        <p className={styles.description}>{currentProduct.description}</p>
        <p className={styles.price}>
          Price : $<span>{currentProduct.price}</span>
        </p>
        <ProductButtons
          productDispatch={dispatch}
          product={currentProduct}
          favoriteProducts={favoriteProducts}
        />
      </div>
    </div>
  );
}

export default SingleProduct;
