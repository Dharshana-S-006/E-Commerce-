import { mockCatalog } from '../data/mockCatalog.js';
import { mockOrders } from '../data/mockOrders.js';
import { memoryManager } from './memoryManager.js';

// OpenAI/Standard Agent Tool Declarations (Schemas)
export const toolDeclarations = [
  {
    name: "search_catalog",
    description: "Search product catalog by keyword, category, or price range. Returns product details, stock, ratings, specs, and pricing.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search keyword e.g. 'headphones', 'smartwatch', 'sneakers'" },
        category: { type: "string", description: "Optional category filter e.g. 'Electronics', 'Fashion', 'Accessories'" },
        max_price: { type: "number", description: "Maximum price filter in USD" }
      },
      required: []
    }
  },
  {
    name: "get_order_status",
    description: "Lookup real-time order tracking details, carrier, ETA, and shipment timeline using an order ID.",
    parameters: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "The customer order ID e.g. 'ORD-8921', 'ORD-7742', 'ORD-3109'" }
      },
      required: ["order_id"]
    }
  },
  {
    name: "process_return",
    description: "Initiate return request or check eligibility for a delivered order based on 30-day return policy.",
    parameters: {
      type: "object",
      properties: {
        order_id: { type: "string", description: "Order ID to process for return e.g. 'ORD-7742'" },
        reason: { type: "string", description: "Reason for return e.g. 'Defective', 'Size mismatch', 'Changed mind'" }
      },
      required: ["order_id", "reason"]
    }
  },
  {
    name: "get_recommendations",
    description: "Fetch personalized product recommendations based on user profile memory, interests, or intent tags.",
    parameters: {
      type: "object",
      properties: {
        category: { type: "string", description: "Category of interest" },
        limit: { type: "number", description: "Number of recommendations to return (default 3)" }
      },
      required: []
    }
  },
  {
    name: "check_inventory",
    description: "Check precise stock count and availability status for a specific product ID.",
    parameters: {
      type: "object",
      properties: {
        product_id: { type: "string", description: "Product ID e.g. 'PROD-101'" }
      },
      required: ["product_id"]
    }
  }
];

// Tool Executors
export const toolExecutors = {
  search_catalog: async ({ query = "", category = "", max_price = 1000 }) => {
    const q = query.toLowerCase().trim();
    let results = mockCatalog.filter(p => {
      const matchQuery = !q || p.name.toLowerCase().includes(q) || 
                          p.description.toLowerCase().includes(q) ||
                          p.tags.some(t => t.toLowerCase().includes(q));
      const matchCat = !category || p.category.toLowerCase() === category.toLowerCase();
      const matchPrice = p.price <= max_price;
      return matchQuery && matchCat && matchPrice;
    });

    if (results.length > 0) {
      memoryManager.addInterest(results[0].name);
    }

    return {
      status: "success",
      count: results.length,
      products: results
    };
  },

  get_order_status: async ({ order_id }) => {
    const cleanId = order_id.toUpperCase().trim();
    const order = mockOrders.find(o => o.orderId === cleanId);

    if (!order) {
      return {
        status: "error",
        message: `Order ID '${cleanId}' was not found in our database. Available demo orders: ORD-8921, ORD-7742, ORD-3109.`
      };
    }

    return {
      status: "success",
      order: order
    };
  },

  process_return: async ({ order_id, reason }) => {
    const cleanId = order_id.toUpperCase().trim();
    const order = mockOrders.find(o => o.orderId === cleanId);

    if (!order) {
      return {
        status: "error",
        message: `Order ID '${cleanId}' not found.`
      };
    }

    if (order.statusCode === "RETURN_INITIATED") {
      return {
        status: "already_returned",
        message: `Return for order ${cleanId} is already in progress.`,
        returnRma: order.returnStatus.returnRma,
        refundAmount: order.totalAmount
      };
    }

    if (order.status !== "Delivered") {
      return {
        status: "ineligible",
        reason: `Order ${cleanId} cannot be returned yet because its current status is '${order.status}'. Return policy requires item delivery.`
      };
    }

    // Generate Return Authorization RMA
    const rmaCode = `RMA-${Math.floor(100000 + Math.random() * 900000)}-RET`;
    order.statusCode = "RETURN_INITIATED";
    order.status = "Return Processing";
    order.returnStatus = {
      eligible: false,
      alreadyRequested: true,
      returnRma: rmaCode,
      refundAmount: order.totalAmount,
      refundMethod: order.paymentMethod,
      returnReason: reason,
      qrCodeData: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${rmaCode}`
    };

    memoryManager.updateProfileKey("support_sentiment", "Return Requested");

    return {
      status: "success",
      message: `Return authorized for Order ${cleanId}. Return RMA label generated.`,
      rmaCode: rmaCode,
      refundAmount: order.totalAmount,
      returnReason: reason,
      qrUrl: order.returnStatus.qrCodeData,
      instructions: "Print or display the QR code at any UPS Dropoff center. Refund will process within 24 hours of package scan."
    };
  },

  get_recommendations: async ({ category = "", limit = 3 }) => {
    const profile = memoryManager.longTermMemory;
    let recs = [...mockCatalog];

    // Priority filter based on user profile preferences
    if (profile.preferred_category && !category) {
      const preferred = profile.preferred_category.toLowerCase();
      recs.sort((a, b) => {
        const aMatch = preferred.includes(a.category.toLowerCase()) ? 1 : 0;
        const bMatch = preferred.includes(b.category.toLowerCase()) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    const selected = recs.slice(0, limit);

    return {
      status: "success",
      basedOn: {
        user_tier: profile.tier,
        preferred_category: profile.preferred_category,
        recent_interests: profile.recent_interests
      },
      recommendations: selected
    };
  },

  check_inventory: async ({ product_id }) => {
    const product = mockCatalog.find(p => p.id.toUpperCase() === product_id.toUpperCase());
    if (!product) {
      return { status: "error", message: `Product ${product_id} not found.` };
    }
    return {
      status: "success",
      product_id: product.id,
      name: product.name,
      stock: product.stock,
      availability: product.stock > 0 ? "In Stock" : "Out of Stock"
    };
  }
};
