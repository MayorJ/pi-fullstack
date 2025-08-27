Pisceses (Cloudinary + MongoDB Atlas)
===================================
This package includes a frontend and a Node.js backend preconfigured to upload images to Cloudinary and store data in MongoDB Atlas.

Quick start:
1. Unzip and cd into backend
2. npm install
3. Copy .env.example to .env and fill MONGO_URI, JWT_SECRET, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET
4. npm start
5. Open http://localhost:5000 to view the frontend

Notes:
- Product and blog images upload directly to Cloudinary; their URLs are saved in MongoDB.
- The admin UI requires registration/login: use /api/auth/register or create a user in the DB.
