import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  cuisine,
  location
}) => {
  return (
    <Link to={`/restaurant/${id}`} className="block">
      <div className="yummeal-card overflow-hidden hover:scale-[1.02] transition-transform">
        <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
        <div className="flex items-center mb-1">
          <div className="flex items-center text-yellow-500 mr-2">
            <Star size={16} fill="currentColor" />
            <span className="text-sm ml-1 text-gray-700">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">• {cuisine}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>{deliveryTime}</span>
          <span className="mx-2">•</span>
          <span>{deliveryFee} delivery</span>
        </div>
        {location && (
          <div className="mt-1 text-sm text-gray-500">{location}</div>
        )}
      </div>
    </Link>
  );
};

export default RestaurantCard;
