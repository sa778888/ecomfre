// components/ProductDetails.tsx
'use client'
import { useCart } from '@/context/CartContext'

export default function ProductDetails({
  product,
  similarProducts
}: {
  product: any
  similarProducts: any[]
}) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    })
  }

  return (
    <div className="container">
      {/* Product display and add to cart button */}
      <button onClick={handleAddToCart}>Add to Cart</button>
      {/* Similar products display */}
    </div>
  )
}
