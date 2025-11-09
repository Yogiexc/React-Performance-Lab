import React, { useState, lazy, Suspense } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { products } from "./data/products";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

const AboutPage = lazy(() => import("./components/AboutPage"));

const saveCartToStorage = (cart) => {
  localStorage.setItem("pos-cart", JSON.stringify(cart));
};

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem("pos-cart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("Gagal memuat keranjang dari localStorage");
    return [];
  }
};

// Buat QueryClient untuk React Query
const queryClient = new QueryClient();

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => loadCartFromStorage());
  const [view, setView] = useState("pos");

  React.useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Query React Query untuk filtering produk
  const { data: filteredProducts, isFetching } = useQuery(
    ["products", searchTerm],
    () => {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return products;

      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    },
    {
      staleTime: 5 * 60 * 1000, // cache 5 menit
      keepPreviousData: true,
    }
  );

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%)", padding: "30px 10px", fontFamily: "'Poppins', sans-serif", color: "#333" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "white", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", padding: "24px", transition: "all 0.3s ease" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => setView("pos")} style={{ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: view === "pos" ? "#43a047" : "#c8e6c9", color: view === "pos" ? "white" : "#2e7d32", cursor: "pointer", fontWeight: "600", transition: "all 0.3s ease" }}>
            💰 POS
          </button>
          <button onClick={() => setView("about")} style={{ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: view === "about" ? "#43a047" : "#c8e6c9", color: view === "about" ? "white" : "#2e7d32", cursor: "pointer", fontWeight: "600", transition: "all 0.3s ease" }}>
            📘 Tentang
          </button>
        </div>

        {view === "pos" ? (
          <>
            <h1 style={{ textAlign: "center", color: "#1b5e20", marginBottom: "16px", fontSize: "1.8rem" }}>🛒 Point of Sales (POS)</h1>

            <div style={{ backgroundColor: "#e8f5e9", padding: "14px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "500" }}>
              <strong>Keranjang:</strong> {totalItems} item
            </div>

            <SearchBar onSearch={setSearchTerm} />

            {searchTerm && (
              <small style={{ color: "#2e7d32", display: "block", marginBottom: "8px", textAlign: "center", fontStyle: "italic" }}>
                {isFetching ? "🔄 Memproses pencarian..." : "✅ Hasil React Query"}
              </small>
            )}

            <div style={{ border: "1px solid #e0e0e0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.04)", transition: "all 0.3s ease" }}>
              <ProductList filteredProducts={filteredProducts || []} onAddToCart={handleAddToCart} />
            </div>
          </>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        )}
      </div>
    </div>
  );
}

// Bungkus AppContent dengan QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
