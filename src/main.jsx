import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { FilterProvider } from './context/FilterContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <FilterProvider>
          <CartProvider>
            <WishlistProvider>
                  <App />
            </WishlistProvider>
          </CartProvider>
        </FilterProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
)
