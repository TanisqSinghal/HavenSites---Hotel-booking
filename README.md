# 🏡 HavenSites

A full-featured Airbnb clone built with Node.js, Express, EJS, and MongoDB. HavenSites lets users create, manage, and explore listings with real-time map views and integrated reviews — all secured with authentication and role-based access.

---
# 👥 Authors

- [Tanishak Singhal](https://www.linkedin.com/in/tanishak-singhal-31462a275/)
- [Rahul Sharma](https://www.linkedin.com/in/rahul-sharma-78142119b/)


## 🚀 Tech Stack

- **Frontend**: HTML, CSS, EJS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Passport.js
- **Map Integration**: Leaflet + OpenStreetMap + Nominatim API
- **File Uploads**: Multer + Cloudinary
- **Templating**: EJS with EJS-Mate

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/havensites.git
cd havensites
```

### 2. Install Dependencies

Install the required packages listed in package.json:

```bash
npm install
```

### 3. Setup Environment Variables
Create a .env file in the root and add the following:

```bash
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret
```

### 4. Inside controllers/listings.js 
Inside your listings.js in controller in your create listing controller (at line 23 in my repo) change you email instead of my email, for example: 

```bash
module.exports.createListing = async (req, res, next) => {
    try {
        const location = req.body.listing.location;

        // Geocode using OpenStreetMap (Nominatim)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`, {
            headers: {
                'User-Agent': 'Wanderlust/1.0 (tanishaksinghal785@gmail.com)' // change with your mail
            }
        });
        const data = await response.json();

        if (data.length === 0) {
            req.flash("error", "Location not found!");
            return res.redirect("/listings/new");
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);





        let url = req.file.path;
        let filename = req.file.filename;
        let { category } = req.body.listing;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        // newListing.category= category;


        newListing.geometry = {
            type: "Point",
            coordinates: [lon, lat]
        };


        let savedListing = await newListing.save();
        console.log(savedListing);
        req.flash("success", "New Listing Created!");
        return res.redirect("/listings");

    } catch (err) {
        next(err);
    }
};
```

### 4.🛠️ Features
✅ Full CRUD operations for listings and reviews

🗂️ MVC structure for scalable project organization

📦 Multer + Cloudinary for secure and efficient image uploads

🔒 Secure authentication with role-based access

🗺️ Map integration with Leaflet + OpenStreetMap

📍 Geocoding support using Nominatim API

🧑‍🤝‍🧑 User roles with permission-based actions

💬 Leave reviews (only if logged in)

🏨 Create and manage your own listings

🚫 Restrict unauthorized edits/deletions

🎯 Listing locations visible on dynamic maps

### 5. Some Glimpses
![alt text](<Screenshot 2025-04-29 095258.png>)
![alt text](<Screenshot 2025-04-29 095550.png>)
![alt text](<Screenshot 2025-04-29 095634.png>)


### 5.🐞 Known Bugs
❗ 80% responsive — still working on full mobile support

