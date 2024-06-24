import { useReducer,useEffect } from "react";
import "./App.css";
import { useCart } from "./hooks/useCart";
// components
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import { IGuitar } from "./data/db";
import { cartReducer, initialState } from "./redurcers/cart-reducers";
function App() {
  const {
    increaseQuantity,
    emptyCart,
    decreaseQuantity,
  } = useCart();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
}, [state.cart])

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar: IGuitar) => (
            <Guitar key={guitar.id} guitarra={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
