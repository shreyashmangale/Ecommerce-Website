import { createContext, useContext, useEffect, useState } from "react"

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {


    const [cartItems, setCartItems] = useState(() => {
        // Load initial state from localStorage
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : [];
    })

    const [cartItemsLength, setCartItemsLength] = useState(() => {
        // Load initial state from localStorage
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart).length : 0;
    });


    useEffect(() => {
        // Sync cartItems with localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem) => {
        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

        if (existingItemIndex !== -1) {
            // If item exists, increase its quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // If item doesn't exist, add it with quantity: 1
            newItem.quantity = 1;
            cartItems.push(newItem);
        }

        setCartItemsLength(cartItems.length);
        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // setCartItems((prevItems) => [...prevItems, item]);
    };

    function addQuantity(itemId) {
    
        const updatedCart = cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems([...updatedCart]);
        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }

    function removeQuantity(itemId) {
    
        const updatedCart = cartItems
            .map(item => 
                item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter(item => item.quantity > 0); // Remove items with quantity 0
        setCartItems([...updatedCart]);
        // Save the updated cart back to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    }

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setCartItemsLength(cartItems.length);
    };
    return (
        <CartContext.Provider value={{ cartItems, cartItemsLength, addToCart, addQuantity, removeQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

// Hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};