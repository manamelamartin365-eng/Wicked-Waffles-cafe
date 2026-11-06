WICKED WAFFLES CAFE WEBSITE — SIMPLE EDITING GUIDE

OPEN THE WEBSITE
1. Extract the ZIP file.
2. Open the folder named wicked-waffles-cafe.
3. Double-click index.html.
4. Use the navigation at the top to visit Home, Menu, Our story, Gallery and Find us.

WHAT HAS BEEN UPDATED
- Add to basket and View details are now two separate buttons.
- Basket button is visible in the top navigation on every page, including Home.
- Your basket stays saved when visitors move between pages in the same browser.
- Menu search works with category filters.
- Choose a category from the dropdown or category buttons.
- Sort products by name or price.

HOW TO ADD OR REMOVE PRODUCTS (NO CODING EXPERIENCE NEEDED)
1. Open the file named products.js using Notepad.
2. Find the section that starts with: const products = [
3. Each product is one line beginning with { id:
4. To change a product, edit its name, category, description, price or image.
5. To remove a product, delete that product's entire line.
6. To add a product, copy one product line, paste it below another product, and change the details.
7. Save the file and refresh the website.

EXAMPLE PRODUCT
{ id: "my-new-waffle", name: "My New Waffle", category: "Waffles", description: "Describe the waffle here.", price: 75, image: "images/my-new-waffle.jpg", special: false },

PRODUCT CATEGORIES
Use one of these exact category names:
Waffles, Pastries, Cakes & Slices, Fresh Bakes, Desserts, Drinks.

PRICES
Enter a number without the R sign, for example price: 75.
If the price is not confirmed, use price: null.
Use special: true to show the DEMO SPECIAL label; otherwise use special: false.

PRODUCT PHOTOS
Put your photo in the images folder. Then use its filename, for example:
image: "images/my-new-waffle.jpg"
Keep the images folder in the same folder as the HTML files.

EDIT WHATSAPP NUMBER
In products.js find cafeSettings and replace the empty whatsappNumber with the café's number in international digits only.
For a South African number, start with 27 and leave out the first 0. Example format: 27821234567.

IMPORTANT ABOUT THE BACKEND
This is a simple website without a server or database. You do not need to learn a complicated admin system: edit products.js in Notepad. Changes appear after saving and refreshing the page. Basket contents are saved in each visitor's browser. A real online admin dashboard, shared inventory, online payments or database would require hosting with a backend service.

DEMO NOTICE
The current product names, descriptions, sample prices and stock photos are examples only. Replace them with the café's real menu before publishing.
