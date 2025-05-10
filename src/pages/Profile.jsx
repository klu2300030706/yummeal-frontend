import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Package, CreditCard, LogOut, Home, Heart, Settings,
  Bell, Edit, PlusCircle
} from 'lucide-react';

import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useApp();

  // Redirect to login if not logged in
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage alt={user.name} src="/placeholder-avatar.jpg" />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Separator />
              <nav className="p-2">
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorite Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Separator className="my-2" />
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="orders">
            <TabsList className="mb-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    View and track your recent orders.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>Order #38492</div>
                          <Badge>Delivered</Badge>
                        </div>
                        <CardDescription>May 8, 2023 • $24.97</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="text-sm text-muted-foreground">2 items from Healthy Bites</div>
                        <Button variant="outline" size="sm">Track Order</Button>
                      </CardFooter>
                    </Card>

                    {/* Order Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>Order #38425</div>
                          <Badge>Delivered</Badge>
                        </div>
                        <CardDescription>April 28, 2023 • $32.50</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="text-sm text-muted-foreground">3 items from Green Garden</div>
                        <Button variant="outline" size="sm">Track Order</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Your Addresses</CardTitle>
                      <CardDescription>Manage your delivery addresses</CardDescription>
                    </div>
                    <Button size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map((address) => (
                        <Card key={address.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">{address.street}</CardTitle>
                              {address.default && <Badge>Default</Badge>}
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 pt-0">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>You don't have any saved addresses yet.</p>
                      <Button className="mt-2" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Your First Address
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Items</CardTitle>
                  <CardDescription>
                    Items and restaurants you've saved for later.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-muted-foreground">
                    <p>You don't have any saved items yet.</p>
                    <p className="mt-1">Browse restaurants and click the heart icon to save them.</p>
                    <Button className="mt-4" onClick={() => navigate('/explore')}>Explore Restaurants</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
