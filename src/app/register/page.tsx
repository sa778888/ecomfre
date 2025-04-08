'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Set animation on load: define a CSS variable for salmon pink
    document.body.style.setProperty('--salmon-pink', '#ff6b6b')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, password })
      })

      if (response.ok) {
        router.push('/login?success=Account created! Please login.')
      } else {
        const data = await response.json()
        setError(data.message || 'Registration failed')
      }
    } catch (error) {
      setError('Something went wrong')
    }
  }

  return (
    <>
      <Header />
      <main
        className="container"
        style={{
          maxWidth: '450px',
          margin: '60px auto',
          padding: '20px',
          animation: 'fadeIn 1s ease-out'
        }}
      >
        <div
          className="form-container"
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            transform: 'translateY(20px)',
            animation: 'slideUp 0.8s ease-out forwards'
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '26px' }}>
            Create Account
          </h1>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'name', label: 'Full Name', value: name, setter: setName },
              { id: 'email', label: 'Email', value: email, setter: setEmail, type: 'email' },
              { id: 'phone', label: 'Phone Number', value: phone, setter: setPhone, type: 'tel' },
              { id: 'address', label: 'Address', value: address, setter: setAddress, type: 'text' },
              { id: 'password', label: 'Password', value: password, setter: setPassword, type: 'password' }
            ].map(({ id, label, value, setter, type = 'text' }) => (
              <div key={id} style={{ marginBottom: '18px' }}>
                <label
                  htmlFor={id}
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: 500
                  }}
                >
                  {label}
                </label>
                {/* For the address field, use a textarea */}
                {id === 'address' ? (
                  <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--salmon-pink)')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                  />
                ) : (
                  <input
                  suppressHydrationWarning 
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    minLength={id === 'password' ? 6 : undefined}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--salmon-pink)')}
                    onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--salmon-pink)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease-in-out',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ff5252'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--salmon-pink)'
              }}
            >
              Register
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--salmon-pink)', textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </div>

        {/* Inline animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  )
}
