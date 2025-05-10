
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/components/ui/sonner';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  showNutrition?: boolean;
  restaurantId: string;
}

const FoodCard = ({
  id,
  name,
  description,
  image,
  price,
  calories,
  protein,
  carbs,
  fat,
  showNutrition = false,
  restaurantId
}: FoodCardProps) => {
  const { addToCart, foodItems } = useApp();
  
  const handleAddToCart = () => {
    const foodItem = foodItems.find(item => item.id === id);
    if (foodItem) {
      addToCart(foodItem);
      toast.success('Added to cart', {
        description: `${name} has been added to your cart`
      });
    }
  };
  
  return (
    <div className="yummeal-card h-full flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <span className="text-yummeal-orange font-medium">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{calories} cal</span>
          {showNutrition && protein && carbs && fat && (
            <>
              <span className="mx-1">•</span>
              <span className="flex space-x-2">
                <span>P: {protein}g</span>
                <span>C: {carbs}g</span>
                <span>F: {fat}g</span>
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