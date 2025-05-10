import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/sonner';

/**
 * @typedef {Object} FoodCardProps
 * @property {string} id - Food item ID
 * @property {string} name - Food item name
 * @property {string} description - Food item description
 * @property {string} image - Food item image URL
 * @property {number} price - Food item price
 * @property {number} calories - Food item calories
 * @property {number} [protein] - Food item protein in grams
 * @property {number} [carbs] - Food item carbs in grams
 * @property {number} [fat] - Food item fat in grams
 * @property {boolean} [showNutrition=false] - Whether to show nutrition info
 * @property {string} restaurantId - Restaurant ID this item belongs to
 */

/**
 * Component for displaying a food item card
 * @param {FoodCardProps} props - Component props
 */
const FoodCard = ({
  id,
  name,
  description,
  image,
  price = 0,
  calories = 0,
  protein,
  carbs,
  fat,
  showNutrition = false,
  restaurantId,
  food
}) => {
  const { addToCart, mockFoodItems } = useApp();
  
  // If a complete food object is passed, use its properties
  const foodItem = food || {
    id,
    name,
    description,
    image,
    price,
    calories,
    protein,
    carbs,
    fat,
    restaurantId
  };
  
  const handleAddToCart = () => {
    const itemToAdd = food || mockFoodItems.find(item => item.id === id);
    if (itemToAdd) {
      addToCart(itemToAdd);
      toast.success('Added to cart', {
        description: `${foodItem.name} has been added to your cart`
      });
    }
  };
  
  return (
    <div className="yummeal-card h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
        <img 
          src={foodItem.image} 
          alt={foodItem.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-800">{foodItem.name}</h3>
          <span className="text-yummeal-orange font-medium">
            ${typeof foodItem.price === 'number' ? foodItem.price.toFixed(2) : '0.00'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{foodItem.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{foodItem.calories || 0} cal</span>
          {showNutrition && foodItem.protein && foodItem.carbs && foodItem.fat && (
            <>
              <span className="mx-1">•</span>
              <span className="flex space-x-2">
                <span>P: {foodItem.protein}g</span>
                <span>C: {foodItem.carbs}g</span>
                <span>F: {foodItem.fat}g</span>
              </span>
            </>
          )}
        </div>
      </div>
      <Button 
        onClick={handleAddToCart}
        className="w-full mt-2 bg-yummeal-green hover:bg-yummeal-darkGreen"
        size="sm"
      >
        <Plus size={16} className="mr-1" /> Add to Cart
      </Button>
    </div>
  );
};

export default FoodCard;
