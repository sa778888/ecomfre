'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    joinDate: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setUserData({
        name: session.user.name || 'User',
        email: session.user.email || 'email@example.com',
        joinDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        phone: session.user.phone || '+1 (555) 123-4567',
        address: session.user.address || '123 Main Street, City, Country'
      })
    }
  }, [session, status])

  if (status === 'loading') {
    return (
      <>
        <Header />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh' 
        }}>
          <div className="loading-spinner"></div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '16px',
          padding: '40px',
          color: 'white',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          marginBottom: '30px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              overflow: 'hidden',
              border: '4px solid white',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              margin: '0 auto 20px'
            }}>
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                fill
                objectFit="cover"
              />
            </div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold',
              margin: '10px 0'
            }}>
              {userData.name}
            </h1>
            <p style={{ 
              fontSize: '16px', 
              opacity: '0.9',
              marginBottom: '5px'
            }}>
              {userData.email}
            </p>
            <p style={{ 
              fontSize: '14px', 
              opacity: '0.7',
              marginBottom: '20px'
            }}>
              Member since {userData.joinDate}
            </p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '25px',
            color: '#374151',
            borderBottom: '2px solid #f3f4f6',
            paddingBottom: '15px'
          }}>
            Personal Information
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#6b7280', 
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Full Name
              </label>
              <div style={{ 
                fontWeight: '500',
                color: '#111827',
                fontSize: '16px'
              }}>
                {userData.name}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#6b7280', 
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <div style={{ 
                fontWeight: '500',
                color: '#111827',
                fontSize: '16px'
              }}>
                {userData.email}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                color: '#6b7280', 
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Phone Number
              </label>
              <div style={{ 
                fontWeight: '500',
                color: '#111827',
                fontSize: '16px'
              }}>
                {userData.phone}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px', gridColumn: '1 / -1' }}>
              <label style={{ 
                display: 'block', 
                color: '#6b7280', 
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                Address
              </label>
              <div style={{ 
                fontWeight: '500',
                color: '#111827',
                fontSize: '16px'
              }}>
                {userData.address}
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            {/* <button style={{
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)'
            }}>
              Edit Profile
            </button> */}
          </div>
        </div>
      </main>
      <Footer />
      
      <style jsx global>{`
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(99, 102, 241, 0.2);
          border-radius: 50%;
          border-top-color: #6366f1;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
