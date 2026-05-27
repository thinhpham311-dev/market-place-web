import { NextResponse } from "next/server";
import axios from "axios";

const API_NEXT = process.env.NEXT_PUBLIC_BASE_URL;

// High-quality mock products matching real Shopee/TikTok Shop listings
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB - Titanium Natural",
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&auto=format&fit=crop&q=80",
    price: 29990000,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB - Titanium Yellow",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&auto=format&fit=crop&q=80",
    price: 27490000,
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Over-Ear Headphones",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    price: 6490000,
    inStock: true,
  },
  {
    id: 4,
    name: "Nike Air Max Pulse Active Sneakers - Off-White/Red",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
    price: 3890000,
    inStock: false,
  },
  {
    id: 5,
    name: "MacBook Pro 16-inch M3 Max (36GB RAM / 1TB SSD)",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80",
    price: 79990000,
    inStock: true,
  },
  {
    id: 6,
    name: "Logitech MX Master 3S High Performance Wireless Mouse",
    thumbnail: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&auto=format&fit=crop&q=80",
    price: 2490000,
    inStock: true,
  },
  {
    id: 7,
    name: "Keychron K2 Mechanical Keyboard v2 (Gateron Brown)",
    thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80",
    price: 1890000,
    inStock: true,
  },
  {
    id: 8,
    name: "iPad Air 10.9-inch M1 64GB Wi-Fi - Space Gray",
    thumbnail: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&auto=format&fit=crop&q=80",
    price: 14990000,
    inStock: true,
  },
  {
    id: 9,
    name: "Nintendo Switch OLED Model - White Joy-Con",
    thumbnail: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&auto=format&fit=crop&q=80",
    price: 7200000,
    inStock: false,
  },
  {
    id: 10,
    name: "Sony PlayStation 5 Slim Console (PS5)",
    thumbnail: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&auto=format&fit=crop&q=80",
    price: 12490000,
    inStock: true,
  },
];

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const limitParam = searchParams.get("limit") || "5";
  const limit = parseInt(limitParam, 10) || 5;

  // 1. Try to query the backend suggestions service if BASE_URL is set
  if (API_NEXT) {
    try {
      const { data } = await axios.get(`${API_NEXT}/v1/api/search/suggest`, {
        params: { q, limit },
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        timeout: 4000,
      });

      const fetched = data?.metadata?.data || data?.data;
      if (Array.isArray(fetched) && fetched.length > 0) {
        return NextResponse.json({
          ...data,
          data: fetched
        });
      }
    } catch (error) {
      console.warn("Suggest proxy failed, falling back to mock data:", error);
    }
  }

  // 2. Fallback to mock data with artificial latency (350ms)
  const keyword = q.trim().toLowerCase();
  
  // Filter products based on search keyword
  const filteredProducts = keyword
    ? MOCK_PRODUCTS.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      )
    : [];

  const limitedResults = filteredProducts.slice(0, limit);

  await new Promise((resolve) => setTimeout(resolve, 350));

  return NextResponse.json({
    message: "Search suggest successful",
    status: 200,
    metadata: {
      data: limitedResults,
      meta: {
        query: q,
        cached: false
      }
    },
    data: limitedResults
  });
}
