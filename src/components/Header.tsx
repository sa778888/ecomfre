"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Search, Menu } from "lucide-react";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navItems = ["Products", "Clothes", "Sports", "Jewellery"];

  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          backgroundColor: "#f9fafb",
          padding: "8px 16px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Free Shipping This Week Order Over - $55
      </div>

      {/* Main Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "16px 24px",
          gap: "12px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Anon
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          style={{
            flexGrow: 1,
            maxWidth: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <input
            type="search"
            placeholder="Enter product name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "10px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 14px",
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search size={18} />
          </button>
        </form>

        {/* Cart and Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link
            href="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#111827",
            }}
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "red",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMenu}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="mobile-toggle"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#374151",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "16px",
            position: "relative",
            paddingBottom: "4px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderBottom = "2px solid black")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderBottom = "2px solid transparent")
          }
        >
          Home
        </Link>

        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
            style={{
              color: "#374151",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "16px",
              position: "relative",
              paddingBottom: "4px",
              display: "inline-block",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.setProperty("border-bottom", "2px solid black");
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.style.setProperty(
                "border-bottom",
                "2px solid transparent"
              );
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobile Responsive Toggle (override via JS) */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-toggle {
            display: inline-block !important;
          }

          nav {
            display: ${menuOpen ? "flex" : "none"} !important;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
          }
        }
      `}</style>
    </header>
  );
}
