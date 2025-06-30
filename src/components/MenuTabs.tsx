import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MenuTabs() {
  return (
    <Tabs defaultValue="starters" className="max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="starters">Starters</TabsTrigger>
        <TabsTrigger value="mains">Mains</TabsTrigger>
        <TabsTrigger value="desserts">Desserts</TabsTrigger>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
      </TabsList>

      <TabsContent value="starters" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Starters & Small Plates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Soup of the Day</h3>
                  <p className="text-muted-foreground">Served with crusty artisan bread and butter</p>
                  <Badge variant="secondary" className="mt-2">Vegetarian Option Available</Badge>
                </div>
                <span className="text-lg font-semibold">£6.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Smoked Salmon & Cream Cheese</h3>
                  <p className="text-muted-foreground">Scottish smoked salmon with dill cream cheese, capers, and sourdough toast</p>
                </div>
                <span className="text-lg font-semibold">£9.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Crispy Calamari</h3>
                  <p className="text-muted-foreground">Lightly battered squid rings with garlic aioli and lemon</p>
                </div>
                <span className="text-lg font-semibold">£8.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Chicken Liver Pâté</h3>
                  <p className="text-muted-foreground">Smooth pâté with red onion chutney and toasted brioche</p>
                </div>
                <span className="text-lg font-semibold">£7.50</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Sharing Platter</h3>
                  <p className="text-muted-foreground">Selection of cured meats, cheeses, olives, hummus, and warm flatbreads</p>
                  <Badge variant="secondary" className="mt-2">Perfect for 2</Badge>
                </div>
                <span className="text-lg font-semibold">£18.50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mains" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Main Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Beer-Battered Fish & Chips</h3>
                  <p className="text-muted-foreground">Fresh cod in crispy beer batter with hand-cut chips, mushy peas, and tartare sauce</p>
                  <Badge variant="secondary" className="mt-2">House Specialty</Badge>
                </div>
                <span className="text-lg font-semibold">£16.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">28-Day Aged Ribeye Steak</h3>
                  <p className="text-muted-foreground">10oz ribeye with roasted tomato, mushroom, chips, and peppercorn sauce</p>
                </div>
                <span className="text-lg font-semibold">£28.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Steak & Ale Pie</h3>
                  <p className="text-muted-foreground">Slow-cooked beef in rich ale gravy, encased in buttery pastry with mash and seasonal vegetables</p>
                </div>
                <span className="text-lg font-semibold">£15.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Pan-Roasted Chicken Supreme</h3>
                  <p className="text-muted-foreground">Free-range chicken breast with dauphinoise potatoes, green beans, and tarragon jus</p>
                </div>
                <span className="text-lg font-semibold">£18.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Wild Mushroom Risotto</h3>
                  <p className="text-muted-foreground">Creamy arborio rice with porcini, shiitake, and truffle oil</p>
                  <Badge variant="secondary" className="mt-2">Vegetarian</Badge>
                </div>
                <span className="text-lg font-semibold">£14.50</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Catch of the Day</h3>
                  <p className="text-muted-foreground">Please ask your server for today's fresh fish special</p>
                </div>
                <span className="text-lg font-semibold">Market Price</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="desserts" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Desserts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Sticky Toffee Pudding</h3>
                  <p className="text-muted-foreground">Warm date sponge with butterscotch sauce and vanilla ice cream</p>
                </div>
                <span className="text-lg font-semibold">£7.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Chocolate Brownie</h3>
                  <p className="text-muted-foreground">Rich chocolate brownie with salted caramel ice cream and chocolate sauce</p>
                </div>
                <span className="text-lg font-semibold">£7.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Lemon Tart</h3>
                  <p className="text-muted-foreground">Zesty lemon tart with raspberry coulis and Chantilly cream</p>
                </div>
                <span className="text-lg font-semibold">£6.50</span>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">British Cheese Board</h3>
                  <p className="text-muted-foreground">Selection of three British cheeses with crackers, chutney, and grapes</p>
                </div>
                <span className="text-lg font-semibold">£9.50</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Ice Cream Selection</h3>
                  <p className="text-muted-foreground">Three scoops of artisan ice cream - ask for today's flavors</p>
                </div>
                <span className="text-lg font-semibold">£5.50</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="drinks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Drinks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Draught Beers & Ales</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Local Shepherd Neame Spitfire</span>
                    <span>£5.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harvey's Sussex Best</span>
                    <span>£5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guinness</span>
                    <span>£5.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amstel</span>
                    <span>£5.20</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-4 mt-8">Wines by the Glass</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>House Red/White/Rosé</span>
                    <span>£6.50/£24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sauvignon Blanc, Marlborough</span>
                    <span>£8.50/£32</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pinot Grigio, Veneto</span>
                    <span>£7.50/£28</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Malbec, Mendoza</span>
                    <span>£8.50/£32</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Soft Drinks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Coca-Cola/Diet Coke</span>
                    <span>£3.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fresh Orange/Apple Juice</span>
                    <span>£3.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elderflower Pressé</span>
                    <span>£3.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Still/Sparkling Water</span>
                    <span>£2.80</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-4 mt-8">Hot Drinks</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Cappuccino/Latte</span>
                    <span>£3.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Espresso/Americano</span>
                    <span>£2.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selection of Teas</span>
                    <span>£2.80</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hot Chocolate</span>
                    <span>£3.80</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}