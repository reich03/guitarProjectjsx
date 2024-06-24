import { useState, useEffect, useMemo } from 'react'
import { IGuitar, db } from '../data/db'

export const useCart = () => {

    const initialSate = (): IGuitar[] => {
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



    function addToCart(guitarra: IGuitar) {
        const elementExists = cart.findIndex((guitar: IGuitar) => guitar.id === guitarra.id)
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

    function deleteToCart(id: number) {
        const removeCart = cart.filter((guitar: IGuitar) => guitar.id !== id);
        setCart(removeCart);
        //otra forma
        // setcart( prevCart => prevCart.filter(guitar => guitar.id !== id))

    }

    function increaseQuantity(id: number) {
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

    function decreaseQuantity(id: number) {
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
    const TotalCart = useMemo(() => cart.reduce((total: number, item: IGuitar) => total + (item.quantity * item.price), 0), [cart])
    return {
        data,
        cart,
        setCart,
        addToCart,
        deleteToCart,
        increaseQuantity,
        emptyCart,
        decreaseQuantity,
        TotalCart
    }
}