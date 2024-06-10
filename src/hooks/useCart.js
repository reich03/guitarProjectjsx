import { useState, useEffect,useMemo } from 'react'
import { db } from '../data/db'

export const useCart = () => {
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

 //State Derivado
 const isEmpty = useMemo(() => cart.length === 0, [cart]);
 const TotalCart = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    return {
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
    }
}