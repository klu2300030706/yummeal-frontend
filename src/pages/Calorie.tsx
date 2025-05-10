import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import FoodCard from '@/components/FoodCard';
import { useApp } from '@/contexts/AppContext';

interface FilterOptions {
  lowCalorie: boolean;
  highProtein: boolean;
  lowCarb: boolean;
  vegan: boolean;
}

const Calorie = () => {
  const { foodItems } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 800]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    lowCalorie: false,
    highProtein: false,
    lowCarb: false,
    vegan: false,
  });
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter food items
  const filteredItems = foodItems.filter((item) => {
    // Search filter
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    // Calorie range filter
    const matchesCalorieRange = item.calories >= calorieRange[0] && item.calories <= calorieRange[1];
    
    // Special filters
    let matchesSpecialFilters = true;
    if (filterOptions.lowCalorie && item.calories > 300) matchesSpecialFilters = false;
    if (filterOptions.highProtein && item.protein < 20) matchesSpecialFilters = false;
    if (filterOptions.lowCarb && item.carbs > 30) matchesSpecialFilters = false;
    // For demo purposes, assume IDs 1, 2, 4, and 8 are vegan items
    if (filterOptions.vegan && !['2', '4', '8'].includes(item.id)) matchesSpecialFilters = false;
    
    // Restaurant type filter (for demo, let's assume we categorize by restaurant ID)
    let matchesTab = true;
    if (activeTab === 'meals' && parseInt(item.restaurantId) > 3) matchesTab = false;
    if (activeTab === 'salads' && parseInt(item.restaurantId) <= 3) matchesTab = false;
    
    return matchesSearch && matchesCalorieRange && matchesSpecialFilters && matchesTab;
  });
  
  const handleFilterChange = (key: keyof FilterOptions) => {
    setFilterOptions({
      ...filterOptions,
      [key]: !filterOptions[key],
    });
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setCalorieRange([0, 800]);
    setFilterOptions({
      lowCalorie: false,
      highProtein: false,
      lowCarb: false,
      vegan: false,
    });
    setActiveTab('all');
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="yummeal-container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">Calorie Counter</h1>
          <p className="text-gray-600 mb-6">
            Find meals that match your dietary goals with detailed nutritional information
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Filters</h3>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <Label htmlFor="search" className="block mb-2 text-gray-700">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="search"
                    placeholder="Search meals..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Calorie Range */}
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-gray-700">Calorie Range</Label>
                  <span className="text-sm text-gray-500">
                    {calorieRange[0]} - {calorieRange[1]} cal
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 800]}
                  min={0}
                  max={800}
                  step={25}
                  value={calorieRange}
                  onValueChange={(value) => setCalorieRange(value as [number, number])}
                  className="my-4"
                />
              </div>
              
              {/* Dietary Preferences */}
              <div>
                <Label className="block mb-3 text-gray-700">Dietary Preferences</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="low-calorie"
                      checked={filterOptions.lowCalorie}
                      onCheckedChange={() => handleFilterChange('lowCalorie')}
                    />
                    <label htmlFor="low-calorie" className="text-sm text-gray-600 cursor-pointer">
                      Low Calorie (&lt;300 cal)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="high-protein"
                      checked={filterOptions.highProtein}
                      onCheckedChange={() => handleFilterChange('highProtein')}
                    />
                    <label htmlFor="high-protein" className="text-sm text-gray-600 cursor-pointer">
                      High Protein (&gt;20g)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="low-carb"
                      checked={filterOptions.lowCarb}
                      onCheckedChange={() => handleFilterChange('lowCarb')}
                    />
                    <label htmlFor="low-carb" className="text-sm text-gray-600 cursor-pointer">
                      Low Carb (&lt;30g)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="vegan"
                      checked={filterOptions.vegan}
                      onCheckedChange={() => handleFilterChange('vegan')}
                    />
                    <label htmlFor="vegan" className="text-sm text-gray-600 cursor-pointer">
                      Vegan Options
                    </label>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Food Items */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="meals">Meals</TabsTrigger>
                <TabsTrigger value="salads">Salads & Bowls</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
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
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">No food items found matching your criteria.</p>
                <Button 
                  variant="link" 
                  className="text-yummeal-orange mt-2"
                  onClick={resetFilters}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calorie;
