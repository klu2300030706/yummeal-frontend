
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useApp } from '@/contexts/AppContext';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, isLoggedIn } = useApp();
  const navigate = useNavigate();
  
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }
  
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen py-16">
        <div className="yummeal-container">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 p-6 bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <Trash2 size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-gray-800">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/explore">
              <Button className="bg-yummeal-orange hover:bg-opacity-90">
                Explore Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (orderSuccess) {
    return (
      <div className="min-h-screen py-16">
        <div className="yummeal-container">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6 p-6 bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <Check size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-gray-800">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your food will be delivered soon!
            </p>
            <Link to="/">
              <Button className="bg-yummeal-orange hover:bg-opacity-90">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const subtotal = cartTotal;
  const deliveryFee = deliveryMethod === 'delivery' ? 3.99 : 0;
  const serviceFee = 1.99;
  const total = subtotal + deliveryFee + serviceFee;
  
  const handleIncrement = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };
  
  const handleDecrement = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };
  
  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    toast.success('Item removed from cart');
  };
  
  const handleProceedToPayment = () => {
    setPaymentStep(true);
  };
  
  const handlePlaceOrder = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setOrderSuccess(true);
      
      // Clear cart in context
      cart.forEach(item => removeFromCart(item.item.id));
    }, 2000);
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="yummeal-container">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {paymentStep ? 'Checkout' : 'Your Cart'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items or Checkout Form */}
          <div className="lg:col-span-2">
            {!paymentStep ? (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Cart Items</h2>
                  
                  <div className="space-y-6">
                    {cart.map((cartItem) => (
                      <div key={cartItem.item.id} className="flex gap-4">
                        <div className="w-24 h-24 rounded-md overflow-hidden">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{cartItem.item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{cartItem.item.calories} cal</p>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDecrement(cartItem.item.id)}
                              disabled={cartItem.quantity <= 1}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="w-8 text-center">{cartItem.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleIncrement(cartItem.item.id)}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <span className="font-medium">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => handleRemove(cartItem.item.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Options</h2>
                  
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Delivery (${deliveryFee.toFixed(2)})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Pickup (Free)</Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryMethod === 'delivery' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Deliver to:</p>
                      <p className="font-medium text-gray-800">123 Main St, San Francisco, CA 94105</p>
                      <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-yummeal-orange">
                        Change Address
                      </Button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Delivery Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="San Francisco" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="CA" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="94105" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Method</h2>
                  
                  <Card className="mb-4">
                    <CardContent className="p-4">
                      <RadioGroup defaultValue="card1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card1" id="card1" checked />
                          <Label htmlFor="card1">Credit Card (Ending in 4242)</Label>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                  
                  <Button variant="outline" size="sm">
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Additional Notes</h2>
                  
                  <Textarea 
                    placeholder="Add any special instructions or requests here..."
                    className="h-24"
                  />
                </div>
              </>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              
              {!paymentStep && (
                <div className="mb-4 max-h-60 overflow-y-auto space-y-3">
                  {cart.map((item) => (
                    <div key={item.item.id} className="flex justify-between text-sm">
                      <span>{item.quantity} x {item.item.name}</span>
                      <span>${(item.item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Separator className="my-4" />
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {!paymentStep ? (
                <Button 
                  className="w-full bg-yummeal-orange hover:bg-opacity-90" 
                  size="lg"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Checkout <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button 
                  className="w-full bg-yummeal-green hover:bg-yummeal-darkGreen" 
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? 'Processing...' : 'Place Order'} 
                  {!paymentProcessing && <Check size={16} className="ml-2" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
