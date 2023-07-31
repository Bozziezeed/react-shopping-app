import products from "../data/products";
import cartReducer from "../reducer/cartReducer";
import { createContext, useContext, useReducer, useEffect } from "react";
//การสร้าง Context
const CartContext = createContext();
const initState = {
  products: products,
  total: 0,
  amount: 0,
};

// children => componet ทั้งหมด ที่ทำงานอยู่ด้านใน CartProvider (HOC)
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  useEffect(() => {
    console.log("คำนวณหาผลรวม");
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.products]);
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const addQuantity = (id) => {
    dispatch({ type: "ADD", payload: id });
  };
  const minusQuantity = (id) => {
    dispatch({ type: "MINUS", payload: id });
  };
  return (
    <CartContext.Provider
      value={{ ...state, formatMoney, removeItem, addQuantity, minusQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
// การนำเอา Context ไปใช้งานด้านนอก
export const useCart = () => {
  return useContext(CartContext);
};
