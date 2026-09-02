# DummyShop

DummyShop is a modern e-commerce web application developed with **React, TypeScript and Vite**. The project simulates a real online shopping experience, allowing users to browse products, search and filter them by category, view product details and manage their shopping cart.

The application uses an external product API to dynamically retrieve products and categories, while **React Context** is used to manage the shopping cart across the application.

## Features

* **Product catalogue** with images, prices, discounts, categories and ratings
* **Product search** with debounce to optimize API requests
* **Category filtering** with dynamically loaded categories
* **Pagination** for browsing products
* **Product details modal** for viewing additional information
* **Shopping cart** with add, remove and quantity management
* **Cart counter** showing the number of items currently in the cart
* **Side cart drawer** with product summary and total price
* **Responsive and dark-themed UI** with a custom orange accent color
* **Material UI** components such as Drawer and Badge

## Technologies

* **React** – UI development and component-based architecture
* **TypeScript** – static typing and safer development
* **Vite** – development server and build tool
* **Material UI** – interface components
* **CSS** – custom application styling
* **React Context API** – global shopping cart state management
* **REST API** – dynamic product and category data

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd DummyShop
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local URL provided by Vite.

## Author

**Alessandro Ambrogiani**
