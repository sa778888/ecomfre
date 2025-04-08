import './styles/style-prefix.css'
import './styles/style.css'
import './styles/desktop-fixes.css'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/AuthProvider'
import CartProviderClient from '@/components/CartProviderClient'

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
        <AuthProvider>
          <CartProviderClient>
            <div className="page-wrapper">{children}</div>
            <Toaster/>
          </CartProviderClient>
        </AuthProvider>
      </body>
    </html>
  )
}
