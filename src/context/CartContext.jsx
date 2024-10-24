import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext();

const INIT_STATE = { carts: [] };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_CART":
      return { carts: [...state.carts, { ...payload, quantity: 1 }] };
    case "REMOVE_CART":
      const carts = state.carts.filter((item) => +item.id !== +payload);
      return { carts };
    case "INC_CART":
      const index = state.carts.findIndex((item) => +item.id === +payload.id);
      const quantity = state.carts[index].quantity + 1;
      return {
        carts: [
          ...state.carts.slice(0, index),
          { ...payload, quantity },
          ...state.carts.slice(index + 1),
        ],
      };
    case "DEC_CART":
      const i = state.carts.findIndex((item) => +item.id === +payload.id);
      const q = state.carts[i].quantity - 1;
      return {
        carts: [
          ...state.carts.slice(0, i),
          { ...payload, quantity: q },
          ...state.carts.slice(i + 1),
        ],
      };
    default:
      throw new Error("an error occured");
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { carts } = state;

  return (
    <CartContext.Provider
      value={{
        carts,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
