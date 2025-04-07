import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id }
  })
  
  if (!product) {
    notFound()
  }
  
  return product
}

async function getSimilarProducts(category: string, currentId: string) {
  return await prisma.product.findMany({
    where: {
      category,
      id: {
        not: currentId
      }
    },
    take: 4,
  })
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const similarProducts = await getSimilarProducts(product.category, product.id)
  
  return (
    <>
      <Header />
      
      <main>
        <div className="product-detail container">
          <div className="product-detail-container">
            <div className="product-detail-left">
              <div className="product-detail-img">
                <Image 
                  src={product.imageUrl} 
                  alt={product.title} 
                  width={500} 
                  height={500} 
                />
              </div>
            </div>
            
            <div className="product-detail-right">
              <h1 className="product-title">{product.title}</h1>
              <div className="product-rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
              </div>
              
              <div className="product-price">
                <p className="price">${product.price.toFixed(2)}</p>
                {product.oldPrice && <del>${product.oldPrice.toFixed(2)}</del>}
              </div>
              
              <div className="product-description">
                <p>{product.description}</p>
              </div>
              
              <div className="product-info">
                <p>Category: <span>{product.category}</span></p>
                <p>Available: <span>{product.available}</span></p>
              </div>
              
              <div className="product-actions">
                <button className="add-cart-btn">Add to Cart</button>
                <button className="btn-action">
                  <i className="fa fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
          
          {similarProducts.length > 0 && (
            <div className="similar-products">
              <h2 className="title">Similar Products</h2>
              <div className="product-grid">
                {similarProducts.map(prod => (
                  <div key={prod.id} className="showcase">
                    <div className="showcase-banner">
                      <Image 
                        src={prod.imageUrl} 
                        alt={prod.title} 
                        width={300} 
                        height={300} 
                        className="product-img default" 
                      />
                    </div>
                    <div className="showcase-content">
                      <a href={`/product/${prod.id}`} className="showcase-category">{prod.category}</a>
                      <h3 className="showcase-title">
                        <a href={`/product/${prod.id}`}>{prod.title}</a>
                      </h3>
                      <div className="price-box">
                        <p className="price">${prod.price.toFixed(2)}</p>
                        {prod.oldPrice && <del>${prod.oldPrice.toFixed(2)}</del>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  )
}
