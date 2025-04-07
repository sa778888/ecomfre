import './styles/style-prefix.css'
import './styles/style.css'
import './styles/desktop-fixes.css' // Add this line
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>E-commerce Site</title>
      </head>
      <body>
        <CartProvider>
          <div className="page-wrapper">{children}</div>
          <Toaster/>
        </CartProvider>
      </body>
    </html>
  )
}
