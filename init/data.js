const sampleListings = [
  {
    title: "Forest Retreat",
    description: "A peaceful getaway surrounded by trees.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1200,
    location: "Asheville, NC",
    country: "USA"
  },
  {
    title: "Desert Oasis",
    description: "Experience the vast beauty of the desert.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 1000,
    location: "Sedona, AZ",
    country: "USA"
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin with breathtaking views.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: 15000,
    location: "Lake Tahoe, CA",
    country: "USA"
  },
  {
    title: "City Lights",
    description: "Stay in the heart of the vibrant city.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    price: 20000,
    location: "New York, NY",
    country: "USA"
  },
  {
    title: "Coastal Breeze",
    description: "Wake up to the sound of waves.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 1800,
    location: "Santa Monica, CA",
    country: "USA"
  },
  {
    title: "Countryside Charm",
    description: "Rustic home in the rolling hills.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    price: 9000,
    location: "Nashville, TN",
    country: "USA"
  },
  {
    title: "Forest Retreat",
    description: "A peaceful getaway surrounded by trees.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1200,
    location: "Asheville, NC",
    country: "USA"
  },
  {
    title: "Desert Oasis",
    description: "Experience the vast beauty of the desert.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 1000,
    location: "Sedona, AZ",
    country: "USA"
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin with breathtaking views.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: 15000,
    location: "Lake Tahoe, CA",
    country: "USA"
  },
  {
    title: "City Lights",
    description: "Stay in the heart of the vibrant city.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    price: 20000,
    location: "New York, NY",
    country: "USA"
  },
  {
    title: "Coastal Breeze",
    description: "Wake up to the sound of waves.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 1800,
    location: "Santa Monica, CA",
    country: "USA"
  },
  {
    title: "Countryside Charm",
    description: "Rustic home in the rolling hills.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    price: 9000,
    location: "Nashville, TN",
    country: "USA"
  },
  {
    title: "Forest Retreat",
    description: "A peaceful getaway surrounded by trees.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1200,
    location: "Asheville, NC",
    country: "USA"
  },
  {
    title: "Desert Oasis",
    description: "Experience the vast beauty of the desert.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 1000,
    location: "Sedona, AZ",
    country: "USA"
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin with breathtaking views.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: 15000,
    location: "Lake Tahoe, CA",
    country: "USA"
  },
  {
    title: "City Lights",
    description: "Stay in the heart of the vibrant city.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    price: 20000,
    location: "New York, NY",
    country: "USA"
  },
  {
    title: "Coastal Breeze",
    description: "Wake up to the sound of waves.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 1800,
    location: "Santa Monica, CA",
    country: "USA"
  },
  {
    title: "Countryside Charm",
    description: "Rustic home in the rolling hills.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    price: 9000,
    location: "Nashville, TN",
    country: "USA"
  },
  {
    title: "Forest Retreat",
    description: "A peaceful getaway surrounded by trees.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 1200,
    location: "Asheville, NC",
    country: "USA"
  },
  {
    title: "Desert Oasis",
    description: "Experience the vast beauty of the desert.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    price: 1000,
    location: "Sedona, AZ",
    country: "USA"
  },
  {
    title: "Mountain Cabin",
    description: "Cozy cabin with breathtaking views.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    price: 15000,
    location: "Lake Tahoe, CA",
    country: "USA"
  },
  {
    title: "City Lights",
    description: "Stay in the heart of the vibrant city.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    price: 20000,
    location: "New York, NY",
    country: "USA"
  },
  {
    title: "Coastal Breeze",
    description: "Wake up to the sound of waves.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 1800,
    location: "Santa Monica, CA",
    country: "USA"
  },
  {
    title: "Countryside Charm",
    description: "Rustic home in the rolling hills.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    price: 9000,
    location: "Nashville, TN",
    country: "USA"
  },
];

module.exports = { data: sampleListings };
