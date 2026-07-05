import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { FilterProvider } from './context/FilterContext'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <FilterProvider>
          <CartProvider>
              <App />
          </CartProvider>
        </FilterProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>,
)
