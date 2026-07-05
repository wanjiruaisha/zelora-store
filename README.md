# Zelora

**Zelora** is a modern e-commerce web application built with React. It provides a clean shopping experience where users can browse products, view product details, manage a cart, save wishlist items, create an account, sign in, and access a protected checkout flow.


---

## Features

* Responsive homepage
* Product listing page
* Product search, filtering, and sorting
* Dynamic product details page
* Nested product details tabs:

  * Overview
  * Reviews
  * Specifications
* Shopping cart functionality
* Wishlist functionality
* User sign-up and login
* Protected checkout route
* Controlled forms with validation
* Loading, error, and empty states
* Mobile-friendly navigation
* Professional UI built with Tailwind CSS and shadcn/ui

---

## Tech Stack

* React
* Vite
* React Router DOM
* Context API
* Tailwind CSS
* shadcn/ui
* Lucide React
* Fake Store API
* Local Storage

---

## Project Structure

```txt
src/
├── components/
│   ├── auth/
│   ├── cart/
│   ├── common/
│   ├── layout/
│   ├── product/
│   └── ui/
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── FilterContext.jsx
│   ├── ProductContext.jsx
│   └── WishlistContext.jsx
│
├── pages/
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── ProductDetails.jsx
│   ├── Products.jsx
│   ├── SignUp.jsx
│   ├── Wishlist.jsx
│   └── product-details/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Routes

```txt
/                            Home page
/products                    Products page
/products/:id                Product details page
/products/:id/reviews        Product reviews tab
/products/:id/specifications Product specifications tab
/cart                        Shopping cart page
/wishlist                    Wishlist page
/login                       Login page
/signup                      Sign-up page
/checkout                    Protected checkout page
*                            Not found page
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/wanjiruaisha/zelora-store.git
```

### 2. Navigate into the project folder

```bash
cd zelora-store
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

---

## Available Scripts

```bash
npm run dev
```

Runs the project locally.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs linting checks.

---

## Environment and Data

Zelora currently fetches product data from the Fake Store API:

```txt
https://fakestoreapi.com/products
```

Authentication, cart, and wishlist data are stored in local storage for demo purposes.

In a production version, authentication and orders should be handled through a secure backend.

---

## Collaboration and Contributions

Contributions to Zelora are welcome. To keep the project organized and easy to maintain, contributors should follow a clear workflow when adding features, fixing bugs, improving the UI, or updating documentation.

### How to Contribute

1. **Fork the repository**

   Create your own copy of the project by forking the repository on GitHub.

2. **Clone the project**

   ```bash
   git clone https://github.com/wanjiruaisha/zelora-store.git
   ```

3. **Navigate into the project folder**

   ```bash
   cd zelora-store
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a new branch**

   Create a branch for the feature, fix, or improvement you want to work on.

   ```bash
   git checkout -b feature/your-feature-name
   ```



6. **Make your changes**

   Keep your changes focused. Avoid mixing unrelated updates in one branch.

7. **Test the project locally**

   ```bash
   npm run dev
   ```

   Before submitting your work, make sure:

   * The app runs without errors
   * The main routes work correctly
   * The UI is responsive
   * Cart, wishlist, login, and checkout flows still work as expected
   * There are no unnecessary console errors

8. **Commit your changes**

   Use clear conventional commit messages.

   ```bash
   git add .
   git commit -m "feat: add wishlist page"
   ```

9. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

10. **Open a pull request**

Open a pull request to the main repository and include a clear summary of what changed.

### Pull Request Guidelines

A good pull request should include:

* A clear title
* A short summary of the changes
* Screenshots for UI changes where necessary
* Any known issues or follow-up work
* Confirmation that the project was tested locally

G
### Code Standards

When contributing, please follow these standards:

* Use reusable components where possible
* Keep components focused and readable
* Use meaningful file and component names
* Keep shared state inside context files
* Avoid unnecessary prop drilling
* Use Tailwind CSS utility classes for styling
* Keep forms controlled with React state
* Validate user inputs before submission
* Maintain a clean and responsive user interface
* Avoid committing unused files or console logs

### Collaboration Notes

Before working on a major change, create or check for an existing issue so work is not duplicated. Keep communication clear, and make sure each contribution improves the store experience, code quality, or documentation.



---

## Deployment

Zelora can be deployed on:

* Vercel
* Netlify
* GitHub Pages

Build the project before deployment:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Future Improvements

* Guest checkout
* Order confirmation page
* Account dashboard
* Order history
* Toast notifications
* Product image gallery
* Mobile filter drawer
* Payment method selection
* Backend authentication

---

## Author

Built and maintained by **Aisha**.
---

##License

Licensed under MIT license