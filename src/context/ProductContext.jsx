import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { fetchData } from "../services/httpReq";
import {
  categoryProducts,
  createQueryObject,
  searchProducts,
} from "../utils/helper";
import { useSearchParams } from "react-router-dom";

const ProductContext = createContext();

const INIT_STATE = {
  isLoading: true,
  products: [],
  isError: false,
  currentProduct: {},
  favoriteProducts: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "PENDING":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return { ...state, isLoading: false, products: payload };
    case "CURRENT_PRODUCT":
      const currentProduct = state.products.find(
        (item) => +item.id === payload
      );
      return { ...state, currentProduct };
    case "FAVORITES_ADD":
      return {
        ...state,
        favoriteProducts: [...state.favoriteProducts, payload],
      };
    case "FAVORITES_REMOVE":
      const favoriteProducts = state.favoriteProducts.filter(
        (item) => +item.id !== payload.id
      );
      return {
        ...state,
        favoriteProducts,
      };
    case "REJECT":
      return { ...state, isLoading: false, error: payload, data: [] };
    default:
      throw new Error("An Error occured");
  }
};

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { products, isLoading, isError, currentProduct, favoriteProducts } =
    state;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState({});
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getProducts() {
      dispatch({ type: "PENDING" });
      try {
        const { data } = await fetchData("/products");
        dispatch({ type: "SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "SUCCESS", payload: error.message });
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    const searchedProducts = searchProducts(products, query.search);
    const filteredProducts = categoryProducts(searchedProducts, query.category);
    setFilterProducts(filteredProducts);
  }, [query]);

  const handleSearch = () => {
    setQuery((query) => createQueryObject(query, { search }));
  };

  const handleCategory = (category) => {
    setCategory(category);
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <ProductContext.Provider
      value={{
        filterProducts,
        isLoading,
        search,
        setSearch,
        handleSearch,
        handleCategory,
        category,
        currentProduct,
        favoriteProducts,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
