# 🛒 ShopFlow Pro

A modern **price comparison and shopping experience** built with React.

ShopFlow Pro is a frontend portfolio project designed to simulate a premium e-commerce and price comparison platform. Users can explore products, compare seller offers, manage favorites and cart items, inspect price information, and go through a complete demo checkout experience.

The project was built from scratch as part of my continuous development as a **Frontend Developer**, with a strong focus on responsive design, reusable React components, user experience, and modern frontend architecture.

## 🌐 Live Demo

👉 https://blaualex97-commits.github.io/shopflow-pro/

## ✨ Features

- 🔎 Product search and browsing
- 🛍️ Product catalog with categories
- 💰 Seller and price comparison
- 📊 Demo price history and price intelligence
- ⭐ Smart product alternatives
- ❤️ Favorites system
- 🛒 Seller-aware shopping cart
- 💳 Demo checkout flow
- 📦 Order history
- 🔄 Reorder functionality
- ❌ Order cancellation
- 🔔 Local demo price alerts
- 🌍 English / Romanian language switcher
- 📱 Fully responsive mobile and desktop interface
- 📱 Mobile bottom navigation
- 💾 Persistent local data using localStorage
- 🔔 Toast notifications
- 🚀 Automated deployment with GitHub Actions

## 🧠 Project Highlights

ShopFlow Pro goes beyond a basic product listing interface.

The application includes multiple interconnected features and user flows, including product discovery, seller selection, cart management, favorites, checkout, orders, price information and responsive navigation.

Special attention was given to:

- reusable React components
- state management with React Context
- responsive layouts
- mobile usability
- routing between application pages
- persistent browser storage
- bilingual UI
- component organization
- clean and consistent visual design

## 🛠️ Tech Stack

- **React**
- **JavaScript (ES6+)**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React**
- **React Context API**
- **localStorage**
- **Git & GitHub**
- **GitHub Actions**
- **GitHub Pages**

## 📄 Main Pages

The application includes:

- Home
- Products
- Product Details
- Favorites
- Cart
- Checkout
- Order Success
- Account / Order History
- 404 Page

## 🛒 Shopping Experience

Products can contain multiple seller offers.

Users can compare available offers and add a specific seller offer to the cart. Cart entries preserve the selected seller, allowing the interface to simulate a more realistic price-comparison marketplace.

The application also includes a complete demo purchase flow from product discovery to checkout and order history.

## 📊 Price Intelligence

Product pages include additional demo shopping information such as:

- price history
- seller comparison
- value indicators
- price alerts
- alternative products

These features are designed to demonstrate more advanced frontend UI and application logic.

## 🌍 Bilingual Interface

ShopFlow Pro supports:

- 🇬🇧 English
- 🇷🇴 Romanian

The selected language is persisted locally for a consistent experience between visits.

## 📱 Responsive Design

The interface was designed to work across:

- mobile phones
- tablets
- laptops
- desktop screens

Mobile users receive a dedicated navigation experience with quick access to products, cart, favorites and account features.

## 💾 Local Persistence

The application uses `localStorage` to persist selected user data such as:

- cart
- favorites
- orders
- language preference
- demo price alerts

This allows the application to preserve the user's state between browser sessions without requiring a backend.

## 🚀 Run Locally

Clone the repository:

```bash
git clone https://github.com/blaualex97-commits/shopflow-pro.git
```

Enter the project directory:

```bash
cd shopflow-pro
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## 📁 Project Structure

```text
src/
├── components/
│   ├── product/
│   ├── CartDrawer.jsx
│   ├── CategoryCard.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── LanguageSelector.jsx
│   ├── ProductCard.jsx
│   ├── SearchBar.jsx
│   └── Toast.jsx
│
├── context/
│   ├── LanguageContext.jsx
│   └── ShopContext.jsx
│
├── data/
│   ├── categories.js
│   ├── priceHistory.js
│   └── products.js
│
├── locales/
│   ├── en.js
│   └── ro.js
│
├── pages/
│   ├── Account.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Favorites.jsx
│   ├── Home.jsx
│   ├── NotFound.jsx
│   ├── OrderSuccess.jsx
│   ├── ProductDetails.jsx
│   └── Products.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

## ⚠️ Demo Project

ShopFlow Pro is a **frontend portfolio/demo application**.

Product prices, sellers, availability, price history and price alerts are simulated demo data and should not be considered live commercial information.

The checkout process does **not** process real payments and no real orders are placed.

## 🎯 Why I Built This Project

I built ShopFlow Pro because I am passionate about technology and enjoy learning frontend development by creating practical applications.

I continuously work on improving my skills and I am always thinking about new features, interfaces and project ideas that can challenge me and expand my portfolio.

My goal is to join a professional development team where I can apply what I have learned, prove my abilities through real work, learn from experienced developers and continue growing as a Frontend Developer.

## 👨‍💻 Author

**Alexandru Filip**

Junior Frontend Developer focused on React and modern web development.

- Portfolio: https://blaualex97-commits.github.io/portofoliu-Alexandru.Filip/
- GitHub: https://github.com/blaualex97-commits

---

If you found this project interesting, feel free to explore the live demo and source code.