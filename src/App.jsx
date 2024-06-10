import { useState, useEffect } from 'react'
import './App.css'
import { db } from './data/db'
// components
import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
function App() {
  
  const initialSate = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialSate);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  useEffect(() => {
    setData(db)
  }, [])

  function addToCart(guitarra) {
    const elementExists = cart.findIndex((guitar) => guitar.id === guitarra.id)
    if (elementExists >= 0) {
      if (cart[elementExists].quantity >= 5) return
      const updateCart = [...cart]
      updateCart[elementExists].quantity++
      setCart(updateCart);
    } else {
      guitarra.quantity = 1
      setCart([...cart, guitarra])

    }
  }

  function deleteToCart(id) {
    const removeCart = cart.filter((guitar) => guitar.id !== id);
    setCart(removeCart);
    //otra forma
    // setcart( prevCart => prevCart.filter(guitar => guitar.id !== id))

  }

  function increaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }
  function emptyCart() {
    setCart([])
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)

  }



  return (
    <>
      <Header
        cart={cart}
        deleteToCart={deleteToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        emptyCart={emptyCart}
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
