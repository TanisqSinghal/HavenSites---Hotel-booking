// const map = new maplibregl.Map({
//     container:"map",
//     style: `https://api.maptiler.com/maps/streets/style.json?key=cfannnRv2gCRgPct3GGk`,// stylesheet location
//     center: listing.geometry.coordinates, // starting position [lng, lat]
//     zoom: 9 // starting zoom
//     });



//     const customMarker = document.createElement('div');
//     customMarker.innerHTML = `
//       <div class="marker-flip-container">
//         <div class="marker-flip-card">
//           <div class="marker-front">
//             <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" />
//           </div>
//           <div class="marker-back">
//             <img src="https://icons.iconarchive.com/icons/fa-team/fontawesome/512/FontAwesome-Hotel-icon.png" />
//           </div>
//         </div>
//       </div>
//     `;


//     const marker= new maplibregl.Marker({color: "red", element: customMarker} )
//     .setLngLat(listing.geometry.coordinates) //Listing.gemetry.coordinates[0],Listing.geometry.coordinates[1])
//     .setPopup(
//         new maplibregl.Popup({offset: 25})
//     .setHTML(
//         `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
//         )
//     )
//     .addTo(map);

const map = L.map('map').setView([28.7041, 77.1025], 13);  // Bangalore coords

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false  // Disable automatic marker when searching
}).addTo(map);



// Add a marker
const marker = L.marker([28.7041, 77.1025]).addTo(map)
  .bindPopup('You are here!')
  .openPopup();