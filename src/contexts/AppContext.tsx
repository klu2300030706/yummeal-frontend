import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  default: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  cuisine: string;
  location: string;
}

interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  restaurantId: string;
}

interface CartItem {
  item: FoodItem;
  quantity: number;
}

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  restaurants: Restaurant[];
  featuredRestaurants: Restaurant[];
  foodItems: FoodItem[];
  popularItems: FoodItem[];
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartTotal: number;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for our app
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Healthy Bites',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    cuisine: 'Healthy',
    location: '1.2 miles away'
  },
  {
    id: '2',
    name: 'Green Garden',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: '$0.99',
    cuisine: 'Vegan',
    location: '0.8 miles away'
  },
  {
    id: '3',
    name: 'Protein Palace',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    cuisine: 'High Protein',
    location: '2.1 miles away'
  },
  {
    id: '4',
    name: 'Fresh & Fast',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    rating: 4.3,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.49',
    cuisine: 'Salads & Bowls',
    location: '1.5 miles away'
  },
  {
    id: '5',
    name: 'Calorie Counter',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    cuisine: 'Diet Friendly',
    location: '1.7 miles away'
  },
  {
    id: '6',
    name: 'Macro Meals',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop',
    rating: 4.4,
    deliveryTime: '25-40 min',
    deliveryFee: '$0',
    cuisine: 'Meal Prep',
    location: '2.3 miles away'
  }
];

const mockFoodItems: FoodItem[] = [
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
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Featured and popular items
  const featuredRestaurants = mockRestaurants.slice(0, 4);
  const popularItems = mockFoodItems.slice(0, 4);

  // Calculate cart total
  const cartTotal = cart.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.quantity;
  }, 0);

  // Add item to cart
  const addToCart = (item: FoodItem) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  // Update item quantity in cart
  const updateQuantity = (itemId: string, quantity: number) => {
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

  // Mock authentication functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser({
        id: '123',
        name: 'John Doe',
        email,
        addresses: [
          {
            id: '1',
            street: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            default: true
          }
        ]
      });
      
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      setUser({
        id: '123',
        name,
        email,
        addresses: []
      });
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    restaurants: mockRestaurants,
    featuredRestaurants,
    foodItems: mockFoodItems,
    popularItems,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    login,
    signup,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for using the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
