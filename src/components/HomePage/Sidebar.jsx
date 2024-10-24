import React from "react";
import { categoriesOption } from "../../constans/constant";
import styles from "./HomePage.module.css";
import { useProduct } from "../../context/ProductContext";

function Sidebar() {
  const { category: categoryState, handleCategory } = useProduct();

  return (
    <div className={styles.sidebar}>
      <p>Filter</p>
      <ul>
        {categoriesOption.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleCategory(item.category)}
              className={`${
                categoryState === item.category ? styles.active : ""
              }`}
            >
              {item.category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
