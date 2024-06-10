import './App.css'
import { useCart } from './hooks/useCart'
// components
import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
function App() {

  const {
    data,
    cart,
    setCart,
    addToCart,
    deleteToCart,
    increaseQuantity,
    emptyCart,
    decreaseQuantity,
    isEmpty,
    TotalCart
  } = useCart()


  return (
    <>
      <Header
        cart={cart}
        deleteToCart={deleteToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
        isEmpty={isEmpty}
        TotalCart={TotalCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitarra={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
