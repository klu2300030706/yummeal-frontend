import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, ChevronLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import FoodCard from '@/components/FoodCard';
import { useApp } from '@/contexts/AppContext';

const Restaurant = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurants, foodItems } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const restaurant = restaurants.find(r => r.id === id);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen py-12">
        <div className="yummeal-container text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link to="/explore">
            <Button className="bg-yummeal-orange hover:bg-opacity-90">
              <ChevronLeft size={16} className="mr-1" /> Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get restaurant menu items
  const menuItems = foodItems.filter(item => item.restaurantId === id);
  
  // Filter menu items based on search
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group menu items by category (for demo, we'll split based on caloriesMatch)
  const mainDishes = menuItems.filter(item => item.calories > 300);
  const sideDishes = menuItems.filter(item => item.calories <= 300);
  
  return (
    <div className="min-h-screen">
      {/* Restaurant Hero */}
      <div 
        className="h-60 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="yummeal-container py-8">
            <Link to="/explore" className="inline-block mb-4">
              <Button variant="outline" size="sm" className="bg-white bg-opacity-90 text-gray-800">
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
            <div className="flex items-center text-white space-x-4">
              <div className="flex items-center">
                <Star size={16} fill="currentColor" className="text-yellow-400" />
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <span>•</span>
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Menu */}
      <div className="bg-white py-8">
        <div className="yummeal-container">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                placeholder="Search menu items"
                className="pl-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Menu Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-gray-100">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="main">Main Dishes</TabsTrigger>
              <TabsTrigger value="sides">Sides & Drinks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredMenuItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenuItems.map(item => (
                    <FoodCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      image={item.image}
                      price={item.price}
                      calories={item.calories}
                      protein={item.protein}
                      carbs={item.carbs}
                      fat={item.fat}
                      restaurantId={item.restaurantId}
                      showNutrition={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No menu items found matching your search.</p>
                  <Button 
                    variant="link" 
                    className="text-yummeal-orange mt-2"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="main">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainDishes.map(item => (
                  <FoodCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                    calories={item.calories}
                    protein={item.protein}
                    carbs={item.carbs}
                    fat={item.fat}
                    restaurantId={item.restaurantId}
                    showNutrition={true}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="sides">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sideDishes.map(item => (
                  <FoodCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    price={item.price}
                    calories={item.calories}
                    protein={item.protein}
                    carbs={item.carbs}
                    fat={item.fat}
                    restaurantId={item.restaurantId}
                    showNutrition={true}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
