// Access listing data passed from EJS
document.addEventListener("DOMContentLoaded", () => {
  const listing = window.listingData; // This should be provided via EJS
  
  const map = L.map('map').setView(listing.geometry.coordinates.reverse(), 13); // reverse to [lat, lng]
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  
  
  
  // Add marker at listing location
  L.marker(listing.geometry.coordinates).addTo(map)
    .bindPopup(`<strong>${listing.title}</strong><br>${listing.location}`)
    .openPopup();
  });
  
  