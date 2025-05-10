import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Package, CreditCard, LogOut, Home, Heart, Settings, 
  Bell, Edit, PlusCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { useApp } from '@/contexts/AppContext';

const Profile = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen py-8">
      <div className="yummeal-container">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <User size={40} className="text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-gray-500"
                >
                  <Edit size={14} className="mr-1" /> Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4">
                <h3 className="font-medium text-gray-700 mb-2">Account Menu</h3>
              </div>
              <Separator />
              <nav className="p-2">
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <User size={18} className="mr-2" /> Personal Information
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Home size={18} className="mr-2" /> Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Package size={18} className="mr-2" /> Order History
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <CreditCard size={18} className="mr-2" /> Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Heart size={18} className="mr-2" /> Favorites
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Bell size={18} className="mr-2" /> Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Settings size={18} className="mr-2" /> Settings
                </Button>
                
                <Separator className="my-2" />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </Button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-6 bg-gray-100">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
                  
                  {user.id ? (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle>Order #38492</CardTitle>
                              <CardDescription>May 8, 2023 • $24.97</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">Track Order</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            From <span className="font-medium text-gray-700">Green Garden</span> • Delivered
                          </p>
                          <p className="text-sm text-gray-500">
                            2 items: Avocado Toast, Berry Protein Smoothie
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="ghost" size="sm">Order Again</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle>Order #38445</CardTitle>
                              <CardDescription>May 4, 2023 • $29.98</CardDescription>
                            </div>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">
                            From <span className="font-medium text-gray-700">Healthy Bites</span> • Delivered
                          </p>
                          <p className="text-sm text-gray-500">
                            2 items: Quinoa Bowl, Chicken Protein Bowl
                          </p>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="ghost" size="sm">Order Again</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">You haven't placed any orders yet.</p>
                  )}
                </div>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
                    <Button size="sm">
                      <PlusCircle size={14} className="mr-1" /> Add New Address
                    </Button>
                  </div>
                  
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map(address => (
                        <Card key={address.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="flex items-center">
                                {address.default && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                                    Default
                                  </span>
                                )}
                                {address.street}
                              </CardTitle>
                              <Button variant="ghost" size="sm">
                                <Edit size={14} className="mr-1" /> Edit
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-500">
                              {`${address.city}, ${address.state} ${address.zipCode}`}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 py-4">You don't have any saved addresses yet.</p>
                  )}
                </div>
              </TabsContent>
              
              {/* Payment Methods Tab */}
              <TabsContent value="payment">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
                    <Button size="sm">
                      <PlusCircle size={14} className="mr-1" /> Add Payment Method
                    </Button>
                  </div>
                  
                  <p className="text-gray-500 py-4">You don't have any payment methods saved yet.</p>
                </div>
              </TabsContent>
              
              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Favorite Items</h2>
                  
                  <p className="text-gray-500 py-4">You don't have any favorites saved yet.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
