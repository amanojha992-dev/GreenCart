import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createRoutesFromElements, useNavigate } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY
    const timer = useRef(null)
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(true)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [veggieQuotes, setVeggieQuotes] = useState([
        "Freshness at your door!",
        "Veggies in minutes!",
        "Farm to table, fast!",
        "Greens on the go!",
        "Quick crunch, fresh munch!",
        "Speedy spinach, rapid radish!",
        "Sow fresh, reap fast!",
        "Wholesome harvest, lightning fast!",
        "Snap, pick, deliver!",
        "Your daily greens, delivered quick!",
    ]);
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("")





    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            console.log(data)
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cart);
            }
        } catch {
            setUser(null);
        }
    };

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch {
            setIsSeller(false);
        }
    };


    const fetchProducts = async () => {
        try {

            const { data } = await axios.get('/api/product/list')

            if (data.success) {
                setProducts(data.products)
            }
            else {

                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const notify = (msg) => {

        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            toast.success(msg)

        }, 250)

    }

  /*   const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            cartData[itemId] += 1
        }

        else {
            cartData[itemId] = 1
        }

        setCartItems(cartData);
        notify("Added to Cart")
    }; */

    const addToCart = (itemId) => {
    const id = String(itemId); // always store as string
    let cartData = { ...cartItems };

    if (cartData[id]) {
        cartData[id] += 1;
    } else {
        cartData[id] = 1;
    }

    setCartItems(cartData);
    notify("Added to Cart");
};


    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        notify("cart Updated")
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        setCartItems(cartData)
        notify("Removed from Cart")
    }

    const getCartItem = () => {
        let count = 0
        for (let item in cartItems) {
            count += cartItems[item]
        }

        return count

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };






    useEffect(() => {

        fetchUser()
        fetchSeller()
        fetchProducts()
    
    }, [])

     // Update Database Cart Items
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (user) {
      updateCart();
    }
  }, [cartItems]);


    const value = { veggieQuotes, navigate, user, isSeller, setIsSeller, setUser, showUserLogin, setShowUserLogin, products, cartItems, addToCart, updateCartItem, removeFromCart, currency, searchQuery, setSearchQuery, getCartItem, getCartAmount, axios, fetchProducts ,setCartItems}
    return <AppContext.Provider value={value}>

        {children}

    </AppContext.Provider>

}

export const useAppContext = () => {

    return useContext(AppContext)
}
