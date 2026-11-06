/*
  WICKED WAFFLES CAFÉ — EASY MENU EDITOR
  This is the ONLY file you need to edit to change products and specials.

  ADD A PRODUCT:
  Copy one complete product object inside the products [ ... ] list.
  Then change its name, category, description, price and image.

  REMOVE A PRODUCT:
  Delete that product's complete { ... } block, including its comma.

  PRICE:
  Use a number, for example price: 65, to show R65.00 and calculate basket totals.
  Use price: null if the café has not confirmed the price. The order can still be sent;
  the customer will be told the café must confirm the final price.

  IMAGE:
  Use a local file such as "images/my-waffle.jpg" or a full image URL.
  Put local photos in a folder named "images".

  SPECIAL:
  Set special: true to show a product in Today's Specials.
  Set special: false for normal menu items.

  IMPORTANT: The items below are DEMO EXAMPLES only. Replace names, descriptions,
  prices and photos with the café's confirmed menu before publishing.
*/
const menuCategories = ["All", "Waffles", "Pastries", "Cakes & Slices", "Fresh Bakes", "Desserts", "Drinks"];

const products = [
  { id: "classic-waffle", name: "Classic Golden Waffle", category: "Waffles", description: "A warm golden waffle served with a dusting of icing sugar.", price: 65, image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80", special: true },
  { id: "berry-waffle", name: "Berry Bliss Waffle", category: "Waffles", description: "A fluffy waffle topped with berries and a sweet drizzle.", price: 89, image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "choc-waffle", name: "Chocolate Dream Waffle", category: "Waffles", description: "A chocolate-inspired treat for anyone with a sweet tooth.", price: 85, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "croissant", name: "Butter Croissant", category: "Pastries", description: "A flaky, buttery pastry — lovely with your favourite coffee.", price: 32, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "choc-croissant", name: "Chocolate Croissant", category: "Pastries", description: "A golden pastry filled with a chocolate-style centre.", price: 39, image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "choc-cake", name: "Chocolate Cake Slice", category: "Cakes & Slices", description: "A rich-looking chocolate cake slice for a little afternoon indulgence.", price: 48, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "cheesecake", name: "Creamy Cheesecake", category: "Cakes & Slices", description: "A smooth, creamy cheesecake slice with a biscuit base.", price: 52, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "muffin", name: "Freshly Baked Muffin", category: "Fresh Bakes", description: "A soft bakery-style muffin, perfect for a quick treat.", price: 30, image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "cupcake", name: "Vanilla Cupcake", category: "Fresh Bakes", description: "A light cupcake finished with a swirl of sweet icing.", price: 28, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "brownie", name: "Chocolate Brownie", category: "Desserts", description: "A fudgy chocolate square for serious chocolate lovers.", price: 35, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "ice-cream", name: "Ice Cream Sundae", category: "Desserts", description: "A cool, creamy dessert with a choice of sweet toppings.", price: 55, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "iced-coffee", name: "Iced Coffee", category: "Drinks", description: "A chilled coffee-style pick-me-up, served over ice.", price: 38, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80", special: false },
  { id: "hot-chocolate", name: "Hot Chocolate", category: "Drinks", description: "A comforting warm chocolate drink.", price: 35, image: "https://images.unsplash.com/photo-1542990253-0b8be3d8e9b1?auto=format&fit=crop&w=900&q=80", special: false }
];

// BUSINESS SETTINGS — update these when the café confirms its details.
const cafeSettings = {
  whatsappNumber: "", // International format, digits only. Example: 27821234567
  whatsappGreeting: "Hello Wicked Waffles Café! I'd like to place an order:",
  currency: "ZAR"
};

// CUSTOMER REVIEWS
// Add genuine customer reviews only, with the customer's permission.
// Example: { name: "Customer name", quote: "Their waffles were delicious!", rating: 5 }
const customerReviews = [];
