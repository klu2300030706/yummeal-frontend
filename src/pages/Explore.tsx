import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RestaurantCard from '@/components/RestaurantCard';
import { useApp } from '@/contexts/AppContext';

const Explore = () => {
  const { restaurants } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  
  // Get unique cuisines for filter
  const cuisines = [...new Set(restaurants.map(restaurant => restaurant.cuisine))];
  
  // Filter restaurants based on search and cuisine
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
    
    return matchesSearch && matchesCuisine;
  });
  
  return (
    <div className="min-h-screen py-8">
      <div className="yummeal-container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">Find Restaurants</h1>
          <p className="text-gray-600 mb-6">
            Discover healthy restaurants near you with nutritious and delicious options
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search for restaurants or cuisines"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                rating={restaurant.rating}
                deliveryTime={restaurant.deliveryTime}
                deliveryFee={restaurant.deliveryFee}
                cuisine={restaurant.cuisine}
                location={restaurant.location}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
              <Button 
                variant="link" 
                className="text-yummeal-orange mt-2"
                onClick={() => {
                  setSearchTerm('');
                  setCuisineFilter('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
