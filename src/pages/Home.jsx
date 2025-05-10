import React, { useState } from 'react';
import { ArrowRight, Search, Timer, Utensils, BarChart3, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import FoodCard from '@/components/FoodCard';
import { useApp } from '@/contexts/AppContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Home = () => {
  const { 
    user, 
    featuredRestaurants, 
    popularItems, 
    loadingRestaurants, 
    error, 
    location, 
    updateLocation 
  } = useApp();
  
  const [searchLocation, setSearchLocation] = useState(location);
  const [searching, setSearching] = useState(false);
  
  const handleLocationSearch = (e) => {
    e.preventDefault();
    if (searchLocation.trim() !== '') {
      setSearching(true);
      updateLocation(searchLocation);
      setTimeout(() => setSearching(false), 1000); // Simulate loading for better UX
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-green-50 py-12 md:py-20">
        <div className="yummeal-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Healthy Food Delivered to Your Door
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Order delicious, nutritious meals with calorie tracking to help you reach your health goals.
            </p>
            <form onSubmit={handleLocationSearch} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Enter your location (e.g., Vijayawada)"
                  className="pl-10 py-6 rounded-lg border-gray-300 w-full"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button 
                type="submit"
                className="bg-yummeal-orange hover:bg-opacity-90 py-6 px-8"
                disabled={searching}
              >
                {searching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Find Food'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="yummeal-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose YumMeal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another food delivery app. We care about your health goals and help you make informed choices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-yummeal-orange mb-4">
                <Utensils size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Healthy Options</h3>
              <p className="text-gray-600">
                Carefully curated restaurants that offer nutritious and delicious meal options for every diet.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-yummeal-green mb-4">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Calorie Tracking</h3>
              <p className="text-gray-600">
                Detailed nutritional information including calories, protein, carbs and fat for every meal.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                <Timer size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to ensure your food arrives fresh and on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-12 bg-gray-50">
        <div className="yummeal-container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Featured Restaurants in {location}</h2>
              <p className="text-gray-600 mt-1">Discover the best healthy food options near you</p>
            </div>
            <Link to="/explore" className="text-yummeal-orange hover:underline flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {loadingRestaurants ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-yummeal-orange" />
              <span className="ml-2 text-gray-600">Loading restaurants...</span>
            </div>
          ) : featuredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  id={restaurant.id}
                  name={restaurant.name}
                  image={restaurant.image}
                  rating={restaurant.rating}
                  deliveryTime={restaurant.deliveryTime}
                  deliveryFee={restaurant.deliveryFee}
                  cuisine={restaurant.cuisine}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No restaurants found in this location. Try searching for a different area.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Popular Items */}
      <section className="py-12 bg-white">
        <div className="yummeal-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Popular Healthy Meals</h2>
            <Link to="/calorie" className="text-yummeal-orange hover:underline flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <FoodCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
                calories={item.calories}
                restaurantId={item.restaurantId}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-12 bg-gradient-to-r from-yummeal-orange to-yummeal-green text-white">
        <div className="yummeal-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to eat healthy?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start ordering nutritious meals right now and track your calorie intake effortlessly.
          </p>
          <Link to="/explore">
            <Button className="bg-white text-yummeal-green hover:bg-gray-100 px-8 py-6 text-lg font-medium">
              Order Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
