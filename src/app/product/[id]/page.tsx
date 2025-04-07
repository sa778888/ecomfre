'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

type Product = {
  id: string
  title: string
  price: number
  oldPrice?: number
  description?: string
  category: string
  imageUrl: string
  createdAt: string
  featured: boolean
  trending: boolean
  newArrival: boolean
  topRated: boolean
  available: number
  sold: number
  dealOfDay: boolean
  dealEnds?: string
}

export default function ProductPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || ''
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`)
        const data = await res.json()
        setProduct(data)

        const allProductsRes = await fetch('/api/products')
        const allProducts = await allProductsRes.json()
        const filtered = allProducts.filter((p: Product) => p.id !== id).slice(0, 6)
        setSimilarProducts(filtered)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl,
    })
    toast.success(`${product.title} added to cart`, { position: 'bottom-center' })
  }

  if (loading)
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
        Loading...
      </div>
    )
  if (!product)
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
        Product not found
      </div>
    )

  return (
    <>
    <Header />
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Main Product Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
        {/* Left: Image */}
        <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: '500px',
              height: '500px',
              position: 'relative',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div style={{ flex: '1 1 500px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>{product.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px', fontWeight: '600', color: '#e11d48' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span style={{ fontSize: '20px', color: '#9ca3af', textDecoration: 'line-through' }}>
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.description && (
            <p style={{ color: '#4b5563', marginBottom: '24px', lineHeight: '1.6' }}>
              {product.description}
            </p>
          )}
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.8' }}>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Available Stock:</strong> {product.available}</p>
            <p><strong>Sold:</strong> {product.sold}</p>
            {product.dealOfDay && product.dealEnds && (
              <p style={{ color: '#dc2626' }}>
                <strong>Deal Ends:</strong> {new Date(product.dealEnds).toLocaleString()}
              </p>
            )}
          </div>
          {/* Quantity and Add to Cart */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <label htmlFor="qty" style={{ fontSize: '14px', fontWeight: '500' }}>Qty:</label>
              <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', width: '120px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '8px', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer' }}
                >
                  -
                </button>
                <input
                  id="qty"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: '40px', textAlign: 'center', border: 'none', outline: 'none' }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '8px', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                backgroundColor: '#e11d48',
                color: '#fff',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div style={{ marginTop: '80px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>You might also like</h2>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px' }}>
            {similarProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/product/${item.id}`)}
                style={{
                  flexShrink: 0,
                  width: '220px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.3s ease'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '192px',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    position: 'relative'
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={220}
                    height={220}
                    style={{ objectFit: 'contain', borderRadius: '4px' }}
                  />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px', textAlign: 'center' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#e11d48', fontWeight: '700', textAlign: 'center' }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
    
  )
}
