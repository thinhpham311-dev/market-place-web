

export const orderData = [
    {
        _id: "64b5a1d2e1fbdc45671234ab",
        user: { name: "Nguyen Van A" },
        items: [
            {
                _id: "64b5a1d2e1fbdc45671234p1",
                name: "Product 1",
                slug: "product-1",
                description: "This is product 1",
                price: 100000,
                countInStock: 10,
                image: "/images/product-1.jpg",
                qty: 2,
            },
            {
                _id: "64b5a1d2e1fbdc45671234p2",
                name: "Product 2",
                slug: "product-2",
                description: "This is product 2",
                price: 200000,
                countInStock: 5,
                image: "/images/product-2.jpg",
                qty: 1,
            },
        ],
        shippingAddress: {
            fullName: "Nguyen Van A",
            address: "123 Le Loi Street",
            city: "Ho Chi Minh",
            postalCode: "700000",
            country: "Vietnam",
        },
        paymentMethod: "Credit Card",
        paymentResult: {
            id: "txn_12345",
            status: "Completed",
            email_address: "nguyenvana@example.com",
        },
        itemsPrice: 400000, // 2 * 100000 + 1 * 200000
        shippingPrice: 50000,
        taxPrice: 20000,
        totalPrice: 470000, // itemsPrice + shippingPrice + taxPrice
        isPaid: true,
        isDelivered: false,
        paidAt: "2025-01-01T10:30:00Z",
        deliveredAt: "2025-01-01T09:00:00Z",
        createdAt: "2025-01-01T09:00:00Z",
        status: "inProgress"
    },
]