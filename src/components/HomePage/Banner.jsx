import React from "react";
import styles from "./HomePage.module.css";
import { RiSearchLine } from "react-icons/ri";
import { useProduct } from "../../context/ProductContext";

function Banner() {
  const { search, setSearch, handleSearch } = useProduct();

  return (
    <div className={styles.banner}>
      <h1>Shoppy happy</h1>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
          <RiSearchLine />
        </button>
      </div>
    </div>
  );
}

export default Banner;
