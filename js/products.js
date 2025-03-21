// Product Data and Management

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Modern Leather Sofa",
    category: "living-room",
    price: 1299.99,
    description:
      "Luxurious 3-seater leather sofa with clean lines and chrome legs. Perfect for contemporary living rooms.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800",
    ],
    rating: 4.8,
    reviews: 124,
    stock: 15,
    specifications: {
      Dimensions: '84"W x 35"D x 31"H',
      Material: "Top-grain leather",
      Frame: "Kiln-dried hardwood",
      "Color Options": ["Black", "Brown", "White"],
      "Assembly Required": "No",
    },
  },
  {
    id: 2,
    name: "Scandinavian Dining Table",
    category: "dining",
    price: 799.99,
    description:
      "Minimalist dining table crafted from solid oak with tapered legs. Seats 6 comfortably.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800",
    ],
    rating: 4.9,
    reviews: 89,
    stock: 8,
    specifications: {
      Dimensions: '72"L x 36"W x 30"H',
      Material: "Solid oak",
      "Seating Capacity": "6",
      Color: "Natural oak",
      "Assembly Required": "Yes",
    },
  },
  {
    id: 3,
    name: "Platform Bed with Storage",
    category: "bedroom",
    price: 899.99,
    description:
      "Modern queen-size platform bed with built-in storage drawers and upholstered headboard.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
    ],
    rating: 4.7,
    reviews: 156,
    stock: 12,
    specifications: {
      Dimensions: '63"W x 83.5"L x 14"H',
      Material: "Engineered wood, Fabric",
      Size: "Queen",
      "Storage Drawers": "4",
      "Assembly Required": "Yes",
    },
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "office",
    price: 349.99,
    description:
      "High-back mesh office chair with adjustable lumbar support and armrests.",
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800",
      "https://images.unsplash.com/photo-1589884629038-b631346a23c0?w=800",
    ],
    rating: 4.6,
    reviews: 203,
    stock: 25,
    specifications: {
      Dimensions: '26"W x 26"D x 46-50"H',
      Material: "Mesh, Metal",
      "Weight Capacity": "300 lbs",
      "Adjustable Height": "Yes",
      "Assembly Required": "Yes",
    },
  },
  {
    id: 5,
    name: "Modern TV Stand",
    category: "living-room",
    price: 449.99,
    description:
      "Floating TV stand with LED lighting and glass shelves. Perfect for modern entertainment setups.",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800",
      "https://images.unsplash.com/photo-1558896801-4f29a24f8b5b?w=800",
    ],
    rating: 4.5,
    reviews: 78,
    stock: 18,
    specifications: {
      Dimensions: '63"W x 14"D x 14"H',
      Material: "MDF, Glass",
      "TV Size Support": 'Up to 65"',
      Storage: "2 cabinets, 2 shelves",
      "Assembly Required": "Yes",
    },
  },
  {
    id: 6,
    name: "Velvet Accent Chair",
    category: "living-room",
    price: 399.99,
    description:
      "Luxurious velvet accent chair with gold-finished metal legs. Adds elegance to any room.",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
    ],
    rating: 4.7,
    reviews: 92,
    stock: 20,
    specifications: {
      Dimensions: '28"W x 31"D x 33"H',
      Material: "Velvet, Metal",
      "Weight Capacity": "250 lbs",
      "Color Options": ["Navy", "Emerald", "Blush"],
      "Assembly Required": "Minimal",
    },
  },
];

// Categories Data
const categories = [
  {
    id: "living-room",
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
    description: "Modern sofas, coffee tables, and entertainment units",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800",
    description: "Beds, wardrobes, and nightstands",
  },
  {
    id: "dining",
    name: "Dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
    description: "Dining tables, chairs, and storage solutions",
  },
  {
    id: "office",
    name: "Office",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    description: "Desks, office chairs, and storage",
  },
];

// Product Filtering Functions
function filterProducts(filters = {}) {
  let filteredProducts = [...products];

  // Filter by category
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.minPrice
    );
  }
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= filters.maxPrice
    );
  }

  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sort products
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming we had a date field, we could sort by that
        break;
    }
  }

  return filteredProducts;
}

// Product Search Function
function searchProducts(query) {
  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
}

// Get Product by ID
function getProductById(id) {
  return products.find((product) => product.id === id);
}

// Get Products by Category
function getProductsByCategory(categoryId) {
  return products.filter((product) => product.category === categoryId);
}

// Get Category by ID
function getCategoryById(id) {
  return categories.find((category) => category.id === id);
}

// Update Product Stock
function updateProductStock(productId, quantity) {
  const product = getProductById(productId);
  if (product) {
    product.stock -= quantity;
    return true;
  }
  return false;
}

// Check Product Availability
function isProductAvailable(productId, quantity = 1) {
  const product = getProductById(productId);
  return product && product.stock >= quantity;
}

// Export functions and data
window.productsModule = {
  products,
  categories,
  filterProducts,
  searchProducts,
  getProductById,
  getProductsByCategory,
  getCategoryById,
  updateProductStock,
  isProductAvailable,
};
