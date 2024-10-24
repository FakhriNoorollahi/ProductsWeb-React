import React from "react";
import styles from "./Checkout.module.css";
import CheckoutCart from "./CheckoutCart";
import CheckoutOrder from "./CheckoutOrder";

function Checkout() {
  return (
    <div className={styles.container}>
      <CheckoutCart />
      <CheckoutOrder />
    </div>
  );
}

export default Checkout;
