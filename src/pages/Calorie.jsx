import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import FoodCard from '@/components/FoodCard';
import { Separator } from '@/components/ui/separator';

const Calorie = () => {
  const { mockFoodItems, addToCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    calories: [0, 800],
    protein: [0, 50],
    carbs: [0, 100],
    fat: [0, 40],
  });

  // Filter items based on search term and nutritional filters
  const filteredItems = mockFoodItems.filter(item => {
    // Match search term
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Match nutritional filters
    const matchesCalories = item.calories >= filters.calories[0] && item.calories <= filters.calories[1];
    const matchesProtein = item.protein >= filters.protein[0] && item.protein <= filters.protein[1];
    const matchesCarbs = item.carbs >= filters.carbs[0] && item.carbs <= filters.carbs[1];
    const matchesFat = item.fat >= filters.fat[0] && item.fat <= filters.fat[1];

    return matchesSearch && matchesCalories && matchesProtein && matchesCarbs && matchesFat;
  });

  // Update a specific filter
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Calorie Counter</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by food name or description"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Nutritional Filters
              </CardTitle>
              <CardDescription>
                Adjust the sliders to filter foods by their nutritional content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calories Filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Calories</h3>
                  <span className="text-sm text-muted-foreground">
                    {filters.calories[0]} - {filters.calories[1]} kcal
                  </span>
                </div>
                <Slider
                  defaultValue={filters.calories}
                  min={0}
                  max={800}
                  step={50}
                  onValueChange={(value) => updateFilter('calories', value)}
                />
              </div>

              {/* Protein Filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Protein</h3>
                  <span className="text-sm text-muted-foreground">
                    {filters.protein[0]} - {filters.protein[1]} g
                  </span>
                </div>
                <Slider
                  defaultValue={filters.protein}
                  min={0}
                  max={50}
                  step={5}
                  onValueChange={(value) => updateFilter('protein', value)}
                />
              </div>

              {/* Carbs Filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Carbs</h3>
                  <span className="text-sm text-muted-foreground">
                    {filters.carbs[0]} - {filters.carbs[1]} g
                  </span>
                </div>
                <Slider
                  defaultValue={filters.carbs}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={(value) => updateFilter('carbs', value)}
                />
              </div>

              {/* Fat Filter */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Fat</h3>
                  <span className="text-sm text-muted-foreground">
                    {filters.fat[0]} - {filters.fat[1]} g
                  </span>
                </div>
                <Slider
                  defaultValue={filters.fat}
                  min={0}
                  max={40}
                  step={2}
                  onValueChange={(value) => updateFilter('fat', value)}
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setFilters({
                  calories: [0, 800],
                  protein: [0, 50],
                  carbs: [0, 100],
                  fat: [0, 40],
                })}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Food Items */}
        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Foods</TabsTrigger>
              <TabsTrigger value="low-calorie">Low Calorie</TabsTrigger>
              <TabsTrigger value="high-protein">High Protein</TabsTrigger>
              <TabsTrigger value="low-carb">Low Carb</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <FoodCard 
                    key={item.id}
                    food={item}
                    onAddToCart={() => addToCart(item)}
                  />
                ))}
              </div>
              {filteredItems.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No items match your search or filters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="low-calorie">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.calories < 300)
                  .map(item => (
                    <FoodCard 
                      key={item.id}
                      food={item}
                      onAddToCart={() => addToCart(item)}
                    />
                  ))
                }
              </div>
            </TabsContent>

            <TabsContent value="high-protein">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.protein > 20)
                  .map(item => (
                    <FoodCard 
                      key={item.id}
                      food={item}
                      onAddToCart={() => addToCart(item)}
                    />
                  ))
                }
              </div>
            </TabsContent>

            <TabsContent value="low-carb">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems
                  .filter(item => item.carbs < 30)
                  .map(item => (
                    <FoodCard 
                      key={item.id}
                      food={item}
                      onAddToCart={() => addToCart(item)}
                    />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Calorie;
