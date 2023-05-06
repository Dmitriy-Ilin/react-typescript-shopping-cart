import { ReactNode, createContext, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    cartQuantity: number;
    cartItems: CartItem[];
    getItemQuantity: (id: number) => number;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
}

type CartItem = {
    id: number;
    quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id) ?.quantity || 0;
    };

    const openCart = () => {
        setIsOpen(true);
    };

    const closeCart = () => {
        setIsOpen(false);
    }

    const increaseItemQuantity = (id: number) => {
        setCartItems(items => {
            if (items.find(e => e.id === id) == null) {
                return [...items, {id, quantity: 1}]
            } else {
                return items.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    };

    const decreaseItemQuantity = (id: number) => {
        setCartItems(items => {
            if (items.find(e => e.id === id)?.quantity === 1) {
                return items.filter(item => item.id !== id);
            } else {
                return items.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    };

    const removeFromCart = (id: number) => {
        setCartItems(items => {
            return items.filter(item => item.id !== id);
        })
    }

    return (
    <ShoppingCartContext.Provider 
        value={{
            getItemQuantity, 
            increaseItemQuantity, 
            decreaseItemQuantity, 
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}
    >
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
    )
}