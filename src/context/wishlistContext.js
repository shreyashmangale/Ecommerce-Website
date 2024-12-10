import { createContext, useContext, useEffect, useState } from "react"

export const WishlistContext = createContext()

export const WishlistContextProvider = ({ children }) => {


    const [wishlistItems, setWishlistItems] = useState(() => {
        // Load initial state from localStorage
        const savedWishlist = localStorage.getItem("wishlistItems");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    })

    const [wishlistItemsLength, setWishlistItemsLength] = useState(() => {
        // Load initial state from localStorage
        const savedCart = localStorage.getItem("wishlistItems");
        return savedCart ? JSON.parse(savedCart).length : 0;
    });

    useEffect(() => {
        // Sync cartItems with localStorage
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (newItem) => {
        // Check if the item is already in the cart
        const existingItemIndex = wishlistItems.findIndex(item => item.id === newItem.id);

        if (existingItemIndex !== -1) {
            // If item exists, increase its quantity
        } else {
            // If item doesn't exist, add it with quantity: 1
            wishlistItems.push(newItem);
        }

        setWishlistItemsLength(wishlistItems.length);
        // Save the updated cart back to localStorage
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        // setWishlistItems((prevItems) => [...prevItems, item]);
    };

    
    const removeFromWishlist = (id) => {
        setWishlistItemsLength(wishlistItemsLength => wishlistItems.length)
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };
    return (
        <WishlistContext.Provider value={{ wishlistItems, wishlistItemsLength, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

// Hook to use the Cart Context
export const useWishlist = () => {
    return useContext(WishlistContext);
};