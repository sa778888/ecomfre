import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-category">
        <div className="container">
          <h2 className="footer-category-title">Brand directory</h2>
          <div className="footer-category-box">
            <h3 className="category-box-title">Fashion:</h3>
            <Link href="#" className="footer-category-link">T-shirt</Link>
            <Link href="#" className="footer-category-link">Shirts</Link>
            <Link href="#" className="footer-category-link">Shorts & Jeans</Link>
            <Link href="#" className="footer-category-link">Jacket</Link>
          </div>
          <div className="footer-category-box">
            <h3 className="category-box-title">Footwear:</h3>
            <Link href="#" className="footer-category-link">Sport</Link>
            <Link href="#" className="footer-category-link">Formal</Link>
            <Link href="#" className="footer-category-link">Boots</Link>
            <Link href="#" className="footer-category-link">Casual</Link>
          </div>
        </div>
      </div>

      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Popular Categories</h2>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Fashion</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Electronics</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Cosmetics</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Health & Wellness</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Watches</Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Products</h2>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Prices drop</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">New products</Link>
            </li>
            <li className="footer-nav-item">
              <Link href="#" className="footer-nav-link">Best sales</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            Copyright &copy; <Link href="/">E-Commerce</Link> all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
