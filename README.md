🎬 Trending Movies Website

📌 Overview

This website displays the top trending movies based on user clicks. It tracks the number of clicks on each movie and stores them in an Appwrite database, ranking movies accordingly. Additionally, it features a powerful search functionality that allows users to explore millions of movies.

🚀 Features

📊 Trending Movies - Movies ranked by real-time user clicks.
🔍 Movie Search - Find movies instantly from a massive database.
🎨 Modern UI - Built with React.js (Vite) and Tailwind CSS for a sleek experience.
📡 Database & API - Uses Appwrite to manage click counts and TMDB API for movie details.
🌎 Deployed on Netlify - Fast and accessible from anywhere.

🛠️ Tech Stack

Frontend: React.js (Vite), Tailwind CSS
Backend & Database: Appwrite
API: TMDB (The Movie Database)
Deployment: Netlify

⚡ Getting Started

1️⃣ Clone the Repository

git clone https://github.com/your-username/trending-movies.git
cd trending-movies

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_TMDB_API_KEY=your-tmdb-api-key

4️⃣ Start the Development Server

npm run dev


📄 License

This project is open-source under the MIT License.


