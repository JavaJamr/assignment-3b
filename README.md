# Project Setup & Execution Instructions 
To Launch File server use
cd C:\Users\gpeng\Desktop\WebAndMobileDesignScripting\Assignment3
then
npm run dev

Outline Prerequisites (Node.js runtime version, package manager).
Describe the installation procedure (e.g., repository cloning, dependency installation commands).
Development server boot script (`npm run dev`) and browser connection verification steps.
Brief overview of the project directory structure. (no more than 3-4 sentences; strict requirement on length)
Essentially, if someone else wants to download, set up, and run your project locally, what instructions do they need?
# Tree
Deconstruct your entire application layout into a formatted, indented Component Tree diagram (like you have done for prior assignments, but this time you need to think in terms of React components).
For every component node in your tree, you must explicitly annotate/label:
Component Name & File Target: (e.g., `<Navbar>` -> `src/components/Navbar.jsx`).
State Ownership (`useState`): If applicable, identify components that own local state (state name, data type, purpose).
Props Interface: If applicable, specify names and data types of all props received by child components.
Callback Handlers & Events: Specify functions passed down across component boundaries (e.g., `onAddToCart(album)`, `onToggleCart()`, `onRemove(id)`).
Route Mapping: Mark which components render conditionally as routed pages under React Router.
To recall what these instructions mean, read them, and then review the lecture code and refer to your notes.

# User Stories
- Story 1 (Genre Filtering & Grid Browsing): As a vinyl enthusiast, I want to filter albums by genre ("All", "Jazz", "Electronic", "Rock", "Classical") so that I can browse releases within my preferred genre.
    **Add filter**
- Story 2 (Album Detail View Routing): As a collector, I want to click an album card to navigate to its dedicated detail view (URL: `/album/:albumId`) to inspect additional details like pressing weight, catalog number, speed, and stock status.
    **Add pressing weight catalog number speed and stock to detail page**
- Story 3 (Stateful Slide-Over Cart): As a shopper, I want to add albums to my cart from catalog or detail views, and inside the cart, I should be able to update quantities (increase or decrease), delete items, and see calculated totals in an interactive cart drawer without page reloads.
    **Add to cart, remove 1 add 1  give totals no reloads**
- Story 4 (Header Cart Badge Sync): As a user browsing across different routes, I want the sticky header to display an updated badge showing total item count in my cart.
    **Breadcrumb navigation and sticky Header**
- Story 5 (Checkout Validation & Funnel): As a customer completing an order, I want to review my itemized order on a dedicated checkout route (`/checkout`), submit shipping details via a controlled web form, and receive an instant confirmation that resets the active cart.
    **let them go to a checkout page**
