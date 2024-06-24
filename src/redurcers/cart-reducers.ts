import { db } from './../data/db';
import { IGuitar } from "../data/db";

//definimos los types o acciones
export type CartActions =
    { type: 'add-to-cart', payload: { item: IGuitar } } |
    { type: 'delete-to-cart', payload: { id: IGuitar['id'] } } |
    { type: 'increase-quantity', payload: { id: IGuitar['id'] } } |
    { type: 'decrease-quantity', payload: { id: IGuitar['id'] } } |
    { type: 'clear-cart' }


//definimos el tipo del estado 
export type CartState = {
    data: IGuitar[]
    cart: IGuitar[]
}


const initialCart = (): IGuitar[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}
//estado inicial de nuestro state
export const initialState: CartState = {
    data: db,
    cart: initialCart() || []
}

//indicarle al State de cart cuales estados y cuales acciones va a soportar
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) => {
    if (action.type === 'add-to-cart') {
        const elementExists = state.cart.find((guitar: IGuitar) => guitar.id === action.payload.item.id)
        let updateCart: IGuitar[] = []
        if (elementExists) {
            updateCart = state.cart.map((item) => {
                if (item.id === action.payload.item.id) {
                    if (item.quantity < 5) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem: IGuitar = { ...action.payload.item, quantity: 1 }
            updateCart = [...state.cart, newItem]

        } return {
            ...state,
            cart: updateCart

        }
    }
    if (action.type === 'delete-to-cart') {

        const cart = state.cart.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            cart
        }
    }

    if (action.type === 'increase-quantity') {
        const updateCart = state.cart.map(item => {
            if (item.id === action.payload.id && item.quantity < 5) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        return {
            ...state,
            cart: updateCart


        }
    }

    if (action.type === 'decrease-quantity') {
        const updateCart = state.cart
            .map(item => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
                return item;
            })
            .filter(item => {
                return item.quantity > 0
            });
        return {
            ...state,
            cart: updateCart
        };
    }



    if (action.type === 'clear-cart') {
        return {

            ...state,
            cart: []
        }
    }

    return state


}