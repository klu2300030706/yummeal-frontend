import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext(undefined);

// API URL for backend
const API_URL = 'https://yummeal-backend.onrender.com';

// Mock food items (we'll keep these until we implement the food items API)
const mockFoodItems = [
  {
    id: '1',
    name: 'Quinoa Bowl',
    description: 'Fresh quinoa with roasted vegetables and tahini dressing',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
    price: 11.99,
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 8,
    restaurantId: '1'
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Whole grain toast with smashed avocado, cherry tomatoes, and microgreens',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&auto=format&fit=crop',
    price: 9.99,
    calories: 280,
    protein: 8,
    carbs: 30,
    fat: 12,
    restaurantId: '2'
  },
  {
    id: '3',
    name: 'Chicken Protein Bowl',
    description: 'Grilled chicken breast with sweet potatoes, broccoli, and brown rice',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&auto=format&fit=crop',
    price: 13.99,
    calories: 420,
    protein: 35,
    carbs: 40,
    fat: 10,
    restaurantId: '3'
  },
  {
    id: '4',
    name: 'Super Green Salad',
    description: 'Kale, spinach, cucumber, avocado with lemon vinaigrette',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop',
    price: 10.99,
    calories: 210,
    protein: 5,
    carbs: 15,
    fat: 14,
    restaurantId: '4'
  },
  {
    id: '5',
    name: 'Low-Cal Salmon Plate',
    description: 'Grilled salmon with asparagus and cauliflower rice',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop',
    price: 15.99,
    calories: 350,
    protein: 28,
    carbs: 18,
    fat: 16,
    restaurantId: '5'
  },
  {
    id: '6',
    name: 'Macro-Balanced Stir Fry',
    description: 'Tofu stir fry with brown rice and mixed vegetables',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop',
    price: 12.99,
    calories: 380,
    protein: 18,
    carbs: 50,
    fat: 9,
    restaurantId: '6'
  },
  {
    id: '7',
    name: 'Berry Protein Smoothie',
    description: 'Mixed berries, Greek yogurt, protein powder, and almond milk',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a2d539c7?w=800&auto=format&fit=crop',
    price: 7.99,
    calories: 240,
    protein: 20,
    carbs: 25,
    fat: 5,
    restaurantId: '1'
  },
  {
    id: '8',
    name: 'Vegan Buddha Bowl',
    description: 'Chickpeas, sweet potato, kale, beets, and tahini sauce',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop',
    price: 12.99,
    calories: 380,
    protein: 15,
    carbs: 55,
    fat: 10,
    restaurantId: '2'
  }
];

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [location, setLocation] = useState('Vijayawada');
  const [error, setError] = useState(null);
  
  // Check for stored token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verify token by making a request to get user profile
          const response = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsLoggedIn(true);
          } else {
            // Token invalid, remove it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Fetch restaurants based on location
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoadingRestaurants(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_URL}/api/restaurants?location=${location}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setRestaurants(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setError('Failed to load restaurants. Please try again later.');
        // Use empty array if fetch fails
        setRestaurants([]);
      } finally {
        setLoadingRestaurants(false);
      }
    };
    
    fetchRestaurants();
  }, [location]);
  
  // Featured and popular items
  const featuredRestaurants = restaurants.slice(0, 4);
  const popularItems = mockFoodItems.slice(0, 4);

  // Calculate cart total
  const cartTotal = cart.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.quantity;
  }, 0);

  // Add item to cart
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Item already in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const updatedCart = cart.map(cartItem => {
      if (cartItem.item.id === itemId) {
        return { ...cartItem, quantity };
      }
      return cartItem;
    });
    
    setCart(updatedCart);
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Set user data from response
      setUser(data.user);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      // Auto login after successful signup
      return login(email, password);
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    setUser(null);
    setIsLoggedIn(false);
    setCart([]);
  };

  // Update location
  const updateLocation = (newLocation) => {
    setLocation(newLocation);
  };

  // Make sure we're providing all values that components might need
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        login,
        signup,
        logout,
        isLoggedIn,
        isLoading,
        featuredRestaurants,
        popularItems,
        restaurants,
        loadingRestaurants,
        error,
        location,
        updateLocation,
        mockFoodItems
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 