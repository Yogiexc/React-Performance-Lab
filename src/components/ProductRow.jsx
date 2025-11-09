import React from "react";

const ProductRow = React.memo(({ product, onAddToCart }) => {
  return (
    <div
      style={{
        padding: "14px 18px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        transition: "all 0.25s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fff9")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
    >
      <div style={{ flex: 1 }}>
        <strong style={{ color: "#1b5e20" }}>{product.name}</strong> •{" "}
        {product.brand} • <span style={{ color: "#666" }}>{product.category}</span>
        <br />
        <small style={{ color: "#757575" }}>Stok: {product.stock}</small>
      </div>

      <div style={{ textAlign: "right", minWidth: "140px" }}>
        <span style={{ fontWeight: "600", color: "#2e7d32" }}>
          Rp{product.price.toLocaleString("id-ID")}
        </span>
        <button
          onClick={() => onAddToCart(product)}
          style={{
            marginLeft: "12px",
            padding: "6px 12px",
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#2e7d32")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#43a047")}
        >
          ➕ Tambah
        </button>
      </div>
    </div>
  );
});

export default ProductRow;
