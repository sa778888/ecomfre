'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Search, Menu } from 'lucide-react'
export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const { cartItems } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  return (
    <header>
      {/* Top Banner */}
      <div className="header-top">
        <div className="container">
          <div className="header-alert-news">
            <p>Free Shipping This Week Order Over - $55</p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container header-main-container">
          {/* Logo */}
          <div className="header-logo">
            <Link href="/">
              <h1 className="logo">Anon</h1>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="header-search-container">
            <input
              type="search"
              name="search"
              className="search-field"
              placeholder="Enter product name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <Search className="icon" />
            </button>
          </form>

          {/* Cart and Menu */}
          <div className="header-user-actions">
            <Link href="/cart" className="cart-icon-wrapper">
              <ShoppingCart className="icon" />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>

            {/* Mobile Toggle Button */}
            <button onClick={toggleMenu} className="mobile-nav-toggle">
              <Menu className="icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`desktop-navigation-menu ${menuOpen ? 'active' : ''}`}>
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category">
              <Link href="/" className="menu-title">Home</Link>
            </li>
            <li className="menu-category">
              <Link href="/products" className="menu-title">Products</Link>
            </li>
            <li className="menu-category">
              <Link href="/products?category=Clothes" className="menu-title">Clothes</Link>
            </li>
            <li className="menu-category">
              <Link href="/products?category=Sports" className="menu-title">Sports</Link>
            </li>
            <li className="menu-category">
              <Link href="/products?category=Jewellery" className="menu-title">Jewellery</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
