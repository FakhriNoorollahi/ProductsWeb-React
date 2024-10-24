import React from "react";
import styles from "./HomePage.module.css";
import Banner from "./Banner";
import Sidebar from "./Sidebar";
import ProductsList from "./ProductsList";

function Products() {
  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.content}>
        <Sidebar />
        <ProductsList />
      </div>
    </div>
  );
}

export default Products;
