import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.product.deleteMany()
  
  // Create new products
  await prisma.product.createMany({
    data: [
      {
        title: 'Relaxed Short full Sleeve T-Shirt',
        price: 45.00,
        category: 'Clothes',
        imageUrl: '/images/products/clothes-1.jpg',
        description: 'Comfortable and stylish t-shirt for casual wear.',
        newArrival: true,
        available: 100,
        sold: 25
      },
      {
        title: 'Girls Pink Embro design Top',
        price: 61.00,
        category: 'Clothes',
        imageUrl: '/images/products/clothes-2.jpg',
        description: 'Beautiful embroidered top for girls.',
        newArrival: true,
        available: 75,
        sold: 15
      },
      {
        title: 'Black Floral Wrap Midi Skirt',
        price: 76.00,
        oldPrice: 85.00,
        category: 'Clothes',
        imageUrl: '/images/products/clothes-3.jpg',
        description: 'Elegant floral midi skirt for various occasions.',
        newArrival: true,
        available: 50,
        sold: 20
      },
      {
        title: 'Pure Garment Dyed Cotton Shirt',
        price: 68.00,
        category: 'Mens Fashion',
        imageUrl: '/images/products/shirt-1.jpg',
        description: 'High-quality cotton shirt for men.',
        newArrival: true,
        available: 80,
        sold: 30
      },
      {
        title: 'MEN Yarn Fleece Full-Zip Jacket',
        price: 61.00,
        category: 'Winter wear',
        imageUrl: '/images/products/jacket-5.jpg',
        description: 'Warm and comfortable fleece jacket for winter.',
        newArrival: true,
        available: 45,
        sold: 15,
        trending: true
      },
      {
        title: 'Mens Winter Leathers Jackets',
        price: 32.00,
        category: 'Winter wear',
        imageUrl: '/images/products/jacket-1.jpg',
        description: 'Stylish leather jacket for the winter season.',
        newArrival: true,
        available: 60,
        sold: 10,
        trending: true
      },
      {
        title: 'Better Basics French Terry Sweatshorts',
        price: 20.00,
        category: 'Shorts',
        imageUrl: '/images/products/shorts-1.jpg',
        description: 'Comfortable sweatshorts for casual wear.',
        newArrival: true,
        available: 70,
        sold: 20
      },
      {
        title: 'Running & Trekking Shoes - White',
        price: 49.00,
        category: 'Sports',
        imageUrl: '/images/products/sports-1.jpg',
        description: 'Comfortable and durable shoes for running and trekking.',
        trending: true,
        available: 65,
        sold: 25
      },
      {
        title: 'Trekking & Running Shoes - black',
        price: 78.00,
        category: 'Sports',
        imageUrl: '/images/products/sports-2.jpg',
        description: 'High-performance shoes for intense activities.',
        trending: true,
        available: 55,
        sold: 30
      },
      {
        title: 'Womens Party Wear Shoes',
        price: 94.00,
        category: 'Party wear',
        imageUrl: '/images/products/party-wear-1.jpg',
        description: 'Elegant shoes for special occasions.',
        trending: true,
        available: 40,
        sold: 15
      },
      {
        title: 'Sports Claw Women\'s Shoes',
        price: 54.00,
        category: 'Sports',
        imageUrl: '/images/products/sports-3.jpg',
        description: 'Stylish and functional sports shoes for women.',
        trending: true,
        available: 75,
        sold: 20
      },
      {
        title: 'Air Trekking Shoes - white',
        price: 52.00,
        category: 'Sports',
        imageUrl: '/images/products/sports-6.jpg',
        description: 'Lightweight and breathable shoes for trekking.',
        trending: true,
        available: 85,
        sold: 35
      },
      {
        title: 'Boot With Suede Detail',
        price: 20.00,
        oldPrice: 30.00,
        category: 'boots',
        imageUrl: '/images/products/boot-3.jpg',
        description: 'Stylish boots with suede detailing.',
        trending: true,
        available: 50,
        sold: 25
      },
      {
        title: 'Men\'s Leather Formal Wear shoes',
        price: 56.00,
        category: 'formal',
        imageUrl: '/images/products/shoe-1.jpg',
        description: 'Elegant formal shoes for men.',
        trending: true,
        available: 60,
        sold: 15
      },
      {
        title: 'Casual Men\'s Brown shoes',
        price: 50.00,
        category: 'Casual',
        imageUrl: '/images/products/shoe-2.jpg',
        description: 'Comfortable casual shoes for everyday wear.',
        trending: true,
        available: 70,
        sold: 30
      },
      {
        title: 'Pocket Watch Leather Pouch',
        price: 50.00,
        category: 'Watches',
        imageUrl: '/images/products/watch-3.jpg',
        description: 'Elegant leather pouch for your pocket watch.',
        topRated: true,
        available: 40,
        sold: 20
      },
      {
        title: 'Silver Deer Heart Necklace',
        price: 84.00,
        category: 'Jewellery',
        imageUrl: '/images/products/jewellery-3.jpg',
        description: 'Beautiful silver necklace with deer heart pendant.',
        topRated: true,
        available: 30,
        sold: 15
      },
      {
        title: 'Titan 100 Ml Womens Perfume',
        price: 42.00,
        category: 'Perfume',
        imageUrl: '/images/products/perfume.jpg',
        description: 'Luxurious fragrance for women.',
        topRated: true,
        available: 55,
        sold: 25
      },
      {
        title: 'Men\'s Leather Reversible Belt',
        price: 24.00,
        oldPrice: 30.00,
        category: 'Belt',
        imageUrl: '/images/products/belt.jpg',
        description: 'Versatile reversible belt made of genuine leather.',
        topRated: true,
        available: 65,
        sold: 20
      },
      {
        title: 'Platinum Zircon Classic Ring',
        price: 62.00,
        category: 'jewellery',
        imageUrl: '/images/products/jewellery-2.jpg',
        description: 'Elegant platinum ring with zircon gemstone.',
        topRated: true,
        available: 35,
        sold: 10
      },
      {
        title: 'Smart Watch Vital Plus',
        price: 56.00,
        category: 'Watches',
        imageUrl: '/images/products/watch-1.jpg',
        description: 'Feature-rich smart watch for fitness and notifications.',
        topRated: true,
        available: 45,
        sold: 25
      },
      {
        title: 'Shampoo Conditioner Packs',
        price: 20.00,
        category: 'cosmetics',
        imageUrl: '/images/products/shampoo.jpg',
        description: 'Hair care combo pack for healthy hair.',
        topRated: true,
        dealOfDay: true,
        available: 40,
        sold: 20,
        dealEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        title: 'Rose Gold Peacock Earrings',
        price: 20.00,
        oldPrice: 30.00,
        category: 'jewellery',
        imageUrl: '/images/products/jewellery-1.jpg',
        description: 'Beautiful rose gold earrings with peacock design.',
        topRated: true,
        dealOfDay: true,
        available: 40,
        sold: 15,
        dealEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    ]
  })
  
  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
