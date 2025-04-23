# 🏡 HavenSites

A full-featured Airbnb clone built with Node.js, Express, EJS, and MongoDB. HavenSites lets users create, manage, and explore listings with real-time map views and integrated reviews — all secured with authentication and role-based access.

---
# 👥 Authors
Tanishak Singhal(https://www.linkedin.com/in/tanishak-singhal-31462a275/)

Rahul Sharma(https://www.linkedin.com/in/tanishak-singhal-31462a275/)

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

### 5.🐞 Known Bugs
❗ 80% responsive — still working on full mobile support

