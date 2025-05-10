import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ChevronLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import FoodCard from '@/components/FoodCard';
import { useApp } from '@/contexts/AppContext';

const Restaurant = () => {
  const { id } = useParams();
  const { restaurants, mockFoodItems, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  // Find the restaurant by id
  const restaurant = restaurants.find(r => r.id === id);
  
  // Filter food items for this restaurant
  const restaurantFoodItems = mockFoodItems.filter(item => item.restaurantId === id);
  
  // Get unique categories
  const categories = ['all', ...new Set(restaurantFoodItems.map(item => {
    // In a real app, items would have categories
    // For this demo, let's generate some fake categories
    const categories = ['Starters', 'Mains', 'Salads', 'Desserts'];
    return categories[Math.floor(Math.random() * categories.length)];
  }))];
  
  // Filter items by active category
  const filteredItems = activeCategory === 'all' 
    ? restaurantFoodItems 
    : restaurantFoodItems.filter(item => {
        const categories = ['Starters', 'Mains', 'Salads', 'Desserts'];
        return categories[Math.floor(Math.random() * categories.length)] === activeCategory;
      });

  if (!restaurant) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
        <Button asChild>
          <Link to="/explore">Back to Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container h-full flex flex-col justify-end pb-6 relative z-10">
          <Button variant="outline" size="sm" className="absolute top-4 left-4 bg-background/80" asChild>
            <Link to="/explore"><ChevronLeft className="h-4 w-4 mr-1" />Back</Link>
          </Button>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="container py-6">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{restaurant.rating}</span>
          </div>
          <div>•</div>
          <div>{restaurant.cuisine}</div>
          <div>•</div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div>•</div>
          <div>{restaurant.location}</div>
        </div>
        
        {/* Tabs for menu sections */}
        <Tabs defaultValue="menu" className="mt-6">
          <TabsList>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu" className="mt-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
            
            {/* Menu Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <FoodCard 
                  key={item.id}
                  food={item}
                  onAddToCart={() => addToCart(item)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-muted p-8 rounded-lg text-center">
              <h3 className="text-xl font-medium mb-2">Customer Reviews</h3>
              <p className="text-muted-foreground">Reviews are not available in this demo</p>
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-6">
            <div className="bg-muted p-8 rounded-lg text-center">
              <h3 className="text-xl font-medium mb-2">Restaurant Information</h3>
              <p className="text-muted-foreground">Additional information not available in this demo</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Restaurant;
