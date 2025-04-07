'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Heart, Eye, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  title: string
  price: number
  oldPrice?: number | null
  category: string
  imageUrl: string
}

export default function ProductCard({ id, title, price, oldPrice, category, imageUrl }: ProductCardProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  const [isEyeClicked, setIsEyeClicked] = useState(false)
  const [isCartClicked, setIsCartClicked] = useState(false)

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsEyeClicked(true)
    setTimeout(() => setIsEyeClicked(false), 150)
    router.push(`/product/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCartClicked(true)
    setTimeout(() => setIsCartClicked(false), 150)
    addToCart({
      id,
      title,
      price,
      quantity: 1,
      imageUrl,
    })
    toast.success(`${title} added to cart`, { position: 'bottom-center' })
  }

  return (
    <div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    backgroundColor: '#fff',
    border: '1px solid #f0f0f0',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: isHovered ? '0 8px 20px rgba(0,0,0,0.08)' : '0 4px 12px rgba(0,0,0,0.06)',
    transform: isHovered ? 'scale(1.18)' : 'scale(1)',
    display: 'flex',
    flexDirection: 'column',
  }}
>
      <div style={{ position: 'relative' }}>
        <Link
          href={`/product/${id}`}
          style={{
            display: 'block',
            position: 'relative',
            width: '100%',
            paddingBottom: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              transition: 'transform 0.3s ease',
            }}
            className="image-hover"
          />
        </Link>

        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 10,
          }}
        >
          <button
  onClick={handleQuickView}
  onMouseEnter={() => setHoveredIcon('eye')}
  onMouseLeave={() => setHoveredIcon(null)}
  style={{
    padding: '10px',
    borderRadius: '50%',
    background: hoveredIcon === 'eye'
      ? 'linear-gradient(135deg, #ff6b6b, #ffa07a)'
      : '#f8f8f8',
    boxShadow: hoveredIcon === 'eye'
      ? '0 8px 20px rgba(255, 107, 107, 0.4)'
      : '0 2px 6px rgba(0,0,0,0.1)',
    transform: hoveredIcon === 'eye'
      ? 'scale(1.25) rotate(-8deg)'
      : 'scale(1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    color: hoveredIcon === 'eye' ? '#fff' : '#1c1c1c',
  }}
>
  <Eye size={18} />
</button>


          <button
  onClick={handleAddToCart}
  onMouseEnter={() => setHoveredIcon('cart')}
  onMouseLeave={() => setHoveredIcon(null)}
  style={{
    padding: '8px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: hoveredIcon === 'cart' ? '0 6px 12px rgba(255, 107, 107, 0.4)' : '0 2px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transform: hoveredIcon === 'cart' ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    color: hoveredIcon === 'cart' ? '#fff' : '#1c1c1c',
    background: hoveredIcon === 'cart' ? '#ff6b6b' : '#fff',
  }}
>
  <ShoppingCart size={18} />
</button>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <Link
          href={`/products?category=${category}`}
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            color: '#ff6b6b',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.5px',
          }}
        >
          {category}
        </Link>

        <Link href={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <h3
            style={{
              marginTop: '6px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#1c1c1c',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6b6b')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#1c1c1c')}
          >
            {title}
          </h3>
        </Link>

        <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff6b6b' }}>
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <del style={{ fontSize: '14px', color: '#999' }}>${oldPrice.toFixed(2)}</del>
          )}
        </div>
      </div>
    </div>
  )
}
