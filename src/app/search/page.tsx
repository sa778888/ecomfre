// src/app/search/page.tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/prisma'

async function searchProducts(query: string) {
  if (!query) return []
  
  return await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } }
      ]
    }
  })
}

export default async function SearchPage(props: {
    searchParams: { q?: string }
  }) {
    // Properly await the searchParams before accessing
    const { q } = await props.searchParams;
    const query = q || '';
    
    // Search for products matching the query in title or category
    const products = await prisma.product.findMany({
      where: query ? {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } }
        ]
      } : {},
      take: 100
    });
    
    return (
      <div className="page-wrapper">
        <Header />
        
        <main>
          <div className="product-container">
            <div className="container">
              <div className="product-box">
                <div className="product-main">
                  <h2 className="title">Search Results for: "{query}"</h2>
                  
                  {products.length === 0 ? (
                    <p>No products found matching your search. Try searching for product titles or categories.</p>
                  ) : (
                    <div className="product-grid">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          oldPrice={product.oldPrice}
                          category={product.category}
                          imageUrl={product.imageUrl}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  