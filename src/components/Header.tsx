'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Search, Menu, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const router = useRouter()
  const { cartItems } = useCart()
  const { data: session, status } = useSession()
  const navItems = ['Products', 'Clothes', 'Sports', 'Jewellery']

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(prev => !prev)
  }

  return (
    <header style={{ width: '100%', borderBottom: '1px solid #e5e7eb', fontFamily: 'sans-serif' }}>
      {/* Top Banner */}
      <div style={{ backgroundColor: '#dbee7d', padding: '8px 16px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
        Free Shipping This Week Order Over - $55
      </div>

      {/* Main Header: Logo + Search + Cart */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px 24px',
        gap: '24px'
      }}>
        {/* Logo */}
        <Link href="/" style={{
          textDecoration: 'none',
          fontSize: '32px',
          fontWeight: 800,
          color: '#1f53a8',
          whiteSpace: 'nowrap'
        }}>
          Anon
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{
          flexGrow: 1,
          maxWidth: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: 280
        }}>
          <input
            type="search"
            placeholder="Enter product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <button type="submit" 
          suppressHydrationWarning 
          style={{
            padding: '10px 14px',
            backgroundColor: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} />
          </button>
        </form>

        {/* User Auth, Cart and Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Profile/Login Button */}
          {status === 'loading' ? (
            <div style={{ width: 26, height: 26 }}></div>
          ) : session ? (
            <div style={{ position: 'relative' }}>
              <button 
              suppressHydrationWarning 
                onClick={toggleUserMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#111827'
                }}
              >
                <User size={26} />
                <span style={{ fontSize: '14px', display: 'none' }} className="username-text">
                  {session.user?.name?.split(' ')[0] || 'Account'}
                </span>
              </button>
              
              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  width: '180px',
                  zIndex: 50
                }}>
                  <button 
                    onClick={() => {
                      router.push('/profile');
                      setUserMenuOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer'
                    }}
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => signOut()}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#f44336',
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#111827',
                textDecoration: 'none'
              }}
            >
              <User size={26} />
              <span style={{ fontSize: '14px', display: 'none' }} className="username-text">
                Login
              </span>
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#111827' }}>
            <ShoppingCart size={26} />
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: 'red',
                color: 'white',
                fontSize: '10px',
                borderRadius: '50%',
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={menuOpen ? 'open' : 'closed'}
        style={{
          display: 'flex', // added display flex here
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '16px',
          paddingBottom: '10px',
          gap: '36px',
          flexWrap: 'wrap'
        }}
      >
        <Link
          href="/"
          style={{
            color: '#111827',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '18px',
            position: 'relative',
            paddingBottom: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '2px solid black'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '2px solid transparent'}
        >
          Home
        </Link>

        {navItems.map(item => (
          <button
          suppressHydrationWarning 
            key={item}
            onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
            style={{
              color: '#111827',
              fontWeight: 700,
              fontSize: '18px',
              position: 'relative',
              paddingBottom: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderBottom = '2px solid black'}
            onMouseLeave={(e) => e.currentTarget.style.borderBottom = '2px solid transparent'}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (min-width: 640px) {
          .username-text {
            display: inline !important;
          }
        }
        
        @media (max-width: 768px) {
          .mobile-toggle {
            display: inline-block !important;
          }
          nav.open {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
          }
          nav.closed {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}
