'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  return (
    <>
    <Header/>
    <div style={{ maxWidth: '1200px',minHeight:'50rem', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem' }}>
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: '#f8f9fa',
              animation: 'bounce 1s infinite',
            }}
          >
            <Image
              src="/images/empty-cart-icon.png"
              alt="Empty Cart"
              width={100}
              height={100}
              style={{ display: 'block', margin: '0 auto' }}
            />
          </div>
          <p>Your cart is empty. Start shopping now!</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={100}
                  height={100}
                  style={{ borderRadius: '8px' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#e63946', fontWeight: 'bold' }}>Price: ${item.price.toFixed(2)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '.5rem' }}>
                    <label htmlFor={`quantity-${item.id}`} style={{ marginRight: '.5rem' }}>
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      min={1}
                      style={{
                        width: '60px',
                        padding: '.25rem',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginTop: '.5rem',
                      color: '#e63946',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '2rem',
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '.5rem' }}>
              Order Summary
            </h2>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333' }}>
              Total Price:
              <span style={{ color: '#e63946', marginLeft: '.5rem' }}>${calculateTotal()}</span>
            </p>
            <Link
              href="/checkout"
              style={{
                display: 'inline-block',
                marginTop: '.5rem',
                padding: '.75rem 1.5rem',
                backgroundColor: '#e63946',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: '600',
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
      <Footer />
      </>
  )
}
