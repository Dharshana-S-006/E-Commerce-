export const mockOrders = [
  {
    orderId: "ORD-8921",
    customerName: "Alex Rivera",
    orderDate: "2026-09-04",
    status: "Out for Delivery",
    statusCode: "IN_TRANSIT",
    carrier: "FedEx Express",
    trackingNumber: "FX-9938201928-US",
    estimatedDelivery: "Today, Sep 7 by 4:30 PM",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    totalAmount: 189.99,
    paymentMethod: "Visa ending in 4242",
    items: [
      {
        id: "PROD-101",
        name: "AuraSound Pro Wireless Headphones",
        quantity: 1,
        price: 189.99,
        image: "images/headphones_1788763327314.jpg"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "Sep 4, 2026 - 10:15 AM", completed: true },
      { status: "Payment Verified", date: "Sep 4, 2026 - 10:16 AM", completed: true },
      { status: "Shipped from Warehouse", date: "Sep 5, 2026 - 02:30 PM", completed: true },
      { status: "Out for Delivery", date: "Sep 7, 2026 - 08:10 AM", completed: true, active: true },
      { status: "Delivered", date: "Estimated Sep 7, 4:30 PM", completed: false }
    ],
    returnStatus: null
  },
  {
    orderId: "ORD-7742",
    customerName: "Alex Rivera",
    orderDate: "2026-08-25",
    status: "Delivered",
    statusCode: "DELIVERED",
    carrier: "DHL Express",
    trackingNumber: "DHL-48301924-US",
    estimatedDelivery: "Aug 28, 2026",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    totalAmount: 149.50,
    paymentMethod: "Apple Pay",
    items: [
      {
        id: "PROD-102",
        name: "PulseFit Horizon Smartwatch 2",
        quantity: 1,
        price: 149.50,
        image: "images/smartwatch_1788763354607.jpg"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "Aug 25, 2026 - 09:00 AM", completed: true },
      { status: "Payment Verified", date: "Aug 25, 2026 - 09:02 AM", completed: true },
      { status: "Shipped from Warehouse", date: "Aug 26, 2026 - 11:00 AM", completed: true },
      { status: "Out for Delivery", date: "Aug 28, 2026 - 07:45 AM", completed: true },
      { status: "Delivered", date: "Aug 28, 2026 - 01:20 PM", completed: true }
    ],
    returnStatus: {
      eligible: true,
      daysRemaining: 18,
      policy: "30-Day Money Back Guarantee"
    }
  },
  {
    orderId: "ORD-3109",
    customerName: "Alex Rivera",
    orderDate: "2026-08-10",
    status: "Return Processing",
    statusCode: "RETURN_INITIATED",
    carrier: "UPS Ground",
    trackingNumber: "1Z9999999999999999",
    estimatedDelivery: "N/A",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    totalAmount: 119.00,
    paymentMethod: "Mastercard ending in 8812",
    items: [
      {
        id: "PROD-103",
        name: "CyberStride Nitro Urban Sneakers",
        quantity: 1,
        price: 119.00,
        image: "images/sneakers_1788763537283.jpg"
      }
    ],
    timeline: [
      { status: "Order Placed", date: "Aug 10, 2026", completed: true },
      { status: "Delivered", date: "Aug 14, 2026", completed: true },
      { status: "Return Requested", date: "Sep 2, 2026", completed: true },
      { status: "Return QR Issued", date: "Sep 2, 2026", completed: true, active: true },
      { status: "Refund Issued", date: "Pending Item Receipt", completed: false }
    ],
    returnStatus: {
      eligible: false,
      alreadyRequested: true,
      returnRma: "RMA-992014-RET",
      refundAmount: 119.00,
      refundMethod: "Original Payment Method"
    }
  }
];
