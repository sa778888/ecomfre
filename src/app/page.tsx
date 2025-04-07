import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/lib/prisma'

async function getProducts(filter: any = {}) {
  return await prisma.product.findMany({
    where: filter,
    take: 8,
  })
}

export default async function HomePage() {
  const newArrivals = await getProducts({ newArrival: true })
  const trending = await getProducts({ trending: true })
  const topRated = await getProducts({ topRated: true })
  const dealOfDay = await getProducts({ dealOfDay: true })
  const newProducts = await prisma.product.findMany({
    take: 12,
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Reusable inline style objects for a professional design
  const sectionStyle: React.CSSProperties = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#333',
  }

  
  const productGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
  }

  const dealSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    backgroundColor: '#fff4e6',
    borderRadius: '10px',
  }

  const dealCardStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    marginBottom: '30px',
    alignItems: 'center',
  }

  const dealImageStyle: React.CSSProperties = {
    borderRadius: '8px',
    objectFit: 'cover',
  }
  
  const dealsSectionStyle: React.CSSProperties = {
    padding: '60px 20px',
    backgroundColor: '#fff8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    maxWidth: '1280px',
    margin: '50px auto',
  };
  
  const dealsHeadingStyle: React.CSSProperties = {
    fontSize: '40px',
    fontWeight: '900',
    color: '#d62828',
    textAlign: 'center',
    marginBottom: '40px',
    letterSpacing: '1px',
  };
  
  const dealsCardWrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    animation: 'pulseCard 3s infinite',
  };
  
  const dealsImageStyle: React.CSSProperties = {
    borderRadius: '10px',
    objectFit: 'cover',
    border: '2px solid #f77f00',
  };
  
  const dealsContentStyle: React.CSSProperties = {
    flex: 1,
  };
  
  const dealsTitleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#023047',
    marginBottom: '12px',
  };
  
  const dealsDescriptionStyle: React.CSSProperties = {
    color: '#6c757d',
    fontSize: '16px',
    marginBottom: '14px',
    lineHeight: '1.6',
  };
  
  const dealsPriceStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#e63946',
    marginBottom: '8px',
  };
  
  const dealsOldPriceStyle: React.CSSProperties = {
    fontSize: '16px',
    textDecoration: 'line-through',
    color: '#999',
    marginBottom: '8px',
  };
  
  const dealsStockStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#555',
  };
  const dealsSectionStyles: React.CSSProperties = {
    padding: '50px 20px',
    backgroundColor: '#fff9f0',
  };
  
  const dealsHeadingStyles: React.CSSProperties = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d62828',
    marginBottom: '40px',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  };
  
  const dealCardStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    animationName: 'pulseCard',
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };
  
  
  const dealImageStyles: React.CSSProperties = {
    borderRadius: '8px',
    border: '2px solid #ffd166',
  };
  
  const dealContentStyles: React.CSSProperties = {
    flex: 1,
  };
  
  const dealTitleStyles: React.CSSProperties = {
    fontSize: '26px',
    color: '#003049',
    marginBottom: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };
  
  const dealDescStyles: React.CSSProperties = {
    color: '#555',
    marginBottom: '10px',
    lineHeight: '1.6',
    fontStyle: 'italic',
  };
  
  const dealPriceStyles: React.CSSProperties = {
    fontSize: '22px',
    color: '#06d6a0',
    fontWeight: 'bold',
    marginBottom: '8px',
  };
  
  const dealOldPriceStyles: React.CSSProperties = {
    textDecoration: 'line-through',
    color: '#999',
    marginBottom: '8px',
  };
  
  const dealStockStyles: React.CSSProperties = {
    color: '#333',
    marginBottom: '5px',
  };
  const trendingSectionStyle: React.CSSProperties = {
    padding: '60px 30px',
    backgroundColor: '#fdfdfd',
  };
  
  const trendingTitleStyle: React.CSSProperties = {
    fontSize: '34px',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#222',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  };
  
  const trendingGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '32px',
    justifyContent: 'center',
    alignItems: 'stretch',
  };
  
  
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8f9fa', color: '#333' }}>
      <Header />

      <main>
        {/* Banner Section - Do Not Change */}
        <section className="banner">
          <div className="container">
            <div className="slider-container">
              <div className="slider-item">
                <Image
                  src="/images/banner-1.jpg"
                  alt="Women's latest fashion sale"
                  className="banner-img"
                  width={1200}
                  height={400}
                />
                <div className="banner-content">
                  <p className="banner-subtitle">Trending Item</p>
                  <h2 className="banner-title">Women's Latest Fashion Sale</h2>
                  <p className="banner-text">Starting at $20.00</p>
                  <Link href="/" className="banner-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* New Arrivals Section */}
<section
  style={{
    ...sectionStyle,
    background: "linear-gradient(to bottom right, #fdfbfb, #ebedee)",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  }}
>
  <h2
    style={{
      ...titleStyle,
      color: "#2c3e50",
      textShadow: "0 2px 4px rgba(0,0,0,0.05)",
    }}
  >
    ✨ New Arrivals
  </h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // smaller cards
      gap: "24px",
    }}
  >
    {newArrivals.slice(0, 10).map((product) => (
      <div
        key={product.id}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          borderRadius: "8px",
          maxWidth: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "8px", // add padding around the card
        }}
      >
        <ProductCard
          id={product.id}
          title={product.title}
          price={product.price}
          oldPrice={product.oldPrice}
          category={product.category}
          imageUrl={product.imageUrl}
        />
      </div>
    ))}
  </div>
</section>



        {/* Deal of the Day Section */}
        {dealOfDay.length > 0 && (
          <>
          <style>
  {`
    @keyframes pulseCard {
      0% {
        transform: scale(1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      50% {
        transform: scale(1.02);
        box-shadow: 0 4px 14px rgba(246, 100, 66, 0.3);
        }
        100% {
          transform: scale(1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      }
      `}
</style>
            <section style={dealsSectionStyle}>

<h2 style={dealsHeadingStyles}>🔥 Deal of the Day</h2>
      {dealOfDay.map((deal) => (
        <div key={deal.id} style={dealCardStyles}>
          <Image
            src={deal.imageUrl}
            alt={deal.title}
            width={240}
            height={240}
            style={dealImageStyles}
          />
          <div style={dealContentStyles}>
            <h3 style={dealTitleStyles}>{deal.title}</h3>
            <p style={dealDescStyles}>{deal.description}</p>
            <p style={dealPriceStyles}>Now: ${deal.price.toFixed(2)}</p>
            {deal.oldPrice && (
              <p style={dealOldPriceStyles}>Before: ${deal.oldPrice.toFixed(2)}</p>
            )}
            <p style={dealStockStyles}>🛒 Sold: {deal.sold}</p>
            <p style={dealStockStyles}>📦 Available: {deal.available}</p>
          </div>
        </div>
    ))}
  </section>
          </>
)}


       {/* Trending Section */}
<section style={trendingSectionStyle}>
  <h2 style={trendingTitleStyle}>🔥 Trending Now</h2>
  <div style={trendingGridStyle}>
    {trending.map((product) => (
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
</section>

        {/* Top Rated Section */}
        <section style={sectionStyle}>
          <h2 style={titleStyle}>Top Rated</h2>
          <div style={productGridStyle}>
            {topRated.map((product) => (
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
        </section>

        {/* New Products Section */}
        <section style={sectionStyle}>
          <h2 style={titleStyle}>New Products</h2>
          <div style={productGridStyle}>
            {newProducts.map((product) => (
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
        </section>
      </main>

      <Footer />
    </div>
  )
}
