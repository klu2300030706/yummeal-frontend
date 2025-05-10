import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { isLoggedIn, cart } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="yummeal-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-yummeal-orange">Yum<span className="text-yummeal-green">Meal</span></span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-yummeal-orange font-medium">
              Home
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-yummeal-orange font-medium">
              Explore
            </Link>
            <Link to="/calorie" className="text-gray-700 hover:text-yummeal-orange font-medium">
              Calorie Counter
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-yummeal-orange">
                  <User size={20} />
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-yummeal-orange relative">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-yummeal-orange">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-yummeal-orange hover:bg-opacity-90">
                  Log In
                </Button>
              </Link>
            )}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Link to="/cart" className="text-gray-700 relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yummeal-orange">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            )}
            <button onClick={toggleMobileMenu} className="text-gray-700">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4 z-50 animate-fade-in">
            <Link
              to="/"
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/calorie"
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calorie Counter
            </Link>
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="text-gray-700 p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
