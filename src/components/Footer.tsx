import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 mt-12">
      <div className="yummeal-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Yum<span className="text-yummeal-green">Meal</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Healthy food delivered to your doorstep with calorie tracking to help you reach your goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Find Restaurants
                </Link>
              </li>
              <li>
                <Link to="/calorie" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Calorie Counter
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Popular Dishes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Healthy Options
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yummeal-orange transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} YumMeal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
