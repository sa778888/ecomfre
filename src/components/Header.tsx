'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Search, Menu } from 'lucide-react'

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const { cartItems } = useCart()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <header style={{ width: '100%', fontFamily: 'sans-serif' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#FEF3C7',
        textAlign: 'center',
        padding: '8px',
        fontSize: '14px',
        fontWeight: 500
      }}>
        Free Shipping This Week Order Over - $55
      </div>

      {/* Main Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '16px 24px',
        borderBottom: '1px solid #e5e7eb',
        gap: '16px'
      }}>
        {/* Logo */}
        <div style={{ fontSize: '24px', fontWeight: 'bold', flexShrink: 0 }}>
          <Link href="/">Anon</Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            flexGrow: 1,
            maxWidth: '500px',
            minWidth: '200px',
            margin: '0 16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter product name or category..."
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '14px',
              border: 'none',
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            backgroundColor: 'black',
            padding: '8px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer'
          }}>
            <Search size={18} />
          </button>
        </form>

        {/* Cart and Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <Link href="/cart" style={{ position: 'relative' }}>
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                backgroundColor: '#EF4444',
                color: 'white',
                fontSize: '12px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartItems.length}
              </span>
            )}
          </Link>

          {isMobile && (
            <button onClick={toggleMenu} style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}>
              <Menu size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      {(menuOpen || !isMobile) && (
        <nav style={{
          width: '100%',
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ul style={{
            display: isMobile ? 'block' : 'flex',
            justifyContent: 'center',
            gap: '32px',
            listStyleType: 'none',
            padding: 0,
            margin: 0
          }}>
            {['Home', 'Products', 'Clothes', 'Sports', 'Jewellery'].map((item) => {
              const url = item === 'Home' ? '/' : item === 'Products' ? '/products' : `/products?category=${item}`
              return (
                <li key={item}>
                  <Link
                    href={url}
                    style={{
                      color: '#374151',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '16px',
                      position: 'relative',
                      paddingBottom: '4px',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.setProperty('border-bottom', '2px solid black')
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.setProperty('border-bottom', '2px solid transparent')
                    }}
                  >
                    {item}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
