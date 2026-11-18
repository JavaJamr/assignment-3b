# Project Setup & Execution Instructions

## Prerequisites

- Node.js v21+
- npm (Node Package Manager)
- Git (for repository cloning)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JavaJamr/assignment-3b.git
   ```

2. Navigate into the project directory:

   ```bash
   cd assignment-3b
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Boot Script
1. Navigate into the project directory:

   ```bash
   cd assignment-3b
   ```
2. Start the Vite development server:

   ```bash
   npm run dev
   ```

3. Open the local URL displayed in the terminal


## Project Directory Overview

Almost every important file can be found in the src folder. Inside the src folder the components folder stores our repeated elements, such as NavBar, CartDrawer, and AlbumCard. pages, data, assets, and our root files such as index.html and package.json. Our Pages folder is more specified including the different modular pages of our application, which typically call our albums.js (In data) which calls the assets folder to generate the dynamic page content with custom images. Finally our primary App.jsx application which is called to be rendered and nested by our main, which is called by index.html allows our application to connect its Routes.

## React Component Hierarchy & State Flow Architecture

```text
<App /> -> src/App.jsx
(Owner: cart [Array of album objects with quantity], isCartOpen [Boolean])
│
├── <Navbar /> -> src/components/Navbar.jsx
│   (Props: cartCount [Number], onOpenCart [Function])
│   (Callback: onOpenCart())
│
├── <main>
│   └── <Routes> [react-router-dom]
│       │
│       ├── <Route path="/" element={<CatalogPage />} >
│       │   └── <CatalogPage /> -> src/pages/CatalogPage.jsx
│       │       (Route: "/")
│       │       (Props: albums [Array], onAddToCart [Function])
│       │       (Owner: selectedGenre [String] - selected album genre filter)
│       │       │
│       │       └── <AlbumCard /> -> src/components/AlbumCard.jsx
│       │           (.map() iterator - renders an album card for each album)
│       │           (Props: albums [Object], onAddToCart [Function])
│       │           (Callback: onAddToCart(albums))
│       │
│       ├── <Route path="/albums/:id" element={<AlbumDetailPage />} >
│       │   └── <AlbumDetailPage /> -> src/pages/AlbumDetailPage.jsx
│       │       (Route: "/albums/:id")
│       │       (Props: albums [Array], onAddToCart [Function])
│       │       (Owner: qty [Number] - selected album quantity)
│       │       (Route parameter: id [String] via useParams())
│       │       (Callback: onAddToCart(album, qty))
│       │
│       └── <Route path="/checkout" element={<CheckoutPage />} >
│           └── <CheckoutPage /> -> src/pages/CheckoutPage.jsx
│               (Route: "/checkout")
│               (Props: cart [Array], onClearCart [Function])
│               (Owner: isSubmitted [Boolean], formData [Object: fullName, email, address, city, postalCode, cardNumber, cvv, expiryDate])
│               (Callbacks: handleChange(event), handleSubmit(event))
│               (Callback passed to parent: onClearCart())
│
└── <CartDrawer /> -> src/components/CartDrawer.jsx
    (Rendered outside <Routes>; visibility controlled by isCartOpen)
    (Props: cart [Array], isOpen [Boolean], onClose [Function], onUpdateQuantity [Function], onRemove [Function])
    (Callbacks: onClose(), onUpdateQuantity(item.id, delta), onRemove(item.id))
    (Internal handler: handleProceedToCheckout())
    (Navigation: useNavigate() -> "/checkout")
```

## User Stories

- **Story 1 (Genre Filtering & Grid Browsing):** As a vinyl enthusiast, I want to filter albums by genre ("All", "Jazz", "Electronic", "Rock", "Classical") so that I can browse releases within my preferred genre.

  **Add a genre filter**

- **Story 2 (Album Detail View Routing):** As a collector, I want to click an album card to navigate to its dedicated detail view (URL: `/album/:albumId`) to inspect additional details like pressing weight, catalog number, speed, and stock status.

  **Add pressing weight catalog number speed and stock to detail page**

- **Story 3 (Stateful Slide-Over Cart):** As a shopper, I want to add albums to my cart from catalog or detail views, and inside the cart, I should be able to update quantities (increase or decrease), delete items, and see calculated totals in an interactive cart drawer without page reloads.

  **Add to cart, remove 1 add 1 give totals no reloads.**

- **Story 4 (Header Cart Badge Sync):** As a user browsing across different routes, I want the sticky header to display an updated badge showing total item count in my cart.

  **Breadcrumb navigation and sticky Header**

- **Story 5 (Checkout Validation & Funnel):** As a customer completing an order, I want to review my itemized order on a dedicated checkout route (`/checkout`), submit shipping details via a controlled web form, and receive an instant confirmation that resets the active cart.

  **let them go to a checkout page with a itemized list**