# 🚀 Smart Caching Proxy Server

> A lightweight **caching proxy server** that reduces redundant API calls and improves response speed using **LRU caching + TTL expiration**.

---

## 🧠 Why This Exists

In most applications:

- Same API is called again and again ❌  
- Response time is slow ❌  
- API rate limits get exhausted ❌  

👉 This project solves it by **caching responses and reusing them intelligently**

---

## ⚡ How It Works

Client → Proxy Server → Cache Check  
                       │  
                 ┌─────┴─────┐  
                HIT         MISS  
                 │            │  
         Return Cached   Fetch from API  
            Response         │  
                             ▼  
                       Store in Cache  
                             │  
                             ▼  
                        Return to Client  

---

## 🔥 Key Features

- ⚡ Faster API responses using caching  
- 🧠 LRU (Least Recently Used) eviction strategy  
- ⏳ TTL-based cache expiration  
- 💻 CLI-based configuration  
- 📊 Metrics endpoint (cache hit/miss tracking)  
- 🌐 Deployable as a public proxy  

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

git clone https://github.com/<your-username>/caching-proxy-server.git  
cd caching-proxy-server  

---

### 2️⃣ Install Dependencies

npm install  

---

### 3️⃣ Run the Server

node src/server.js --port=3000 --ttl=60 --maxCache=100  

---

## 🌐 How to Use

### 🔹 Normal API Call (Before)

https://api.example.com/data  

---

### 🔹 Using Proxy (After)

http://localhost:3000/proxy?url=https://api.example.com/data  

👉 Just replace your API URL with this format

---

## 📊 Metrics Endpoint

Track performance in real-time:

http://localhost:3000/metrics  

### Example Response:

{
  "totalRequests": 10,
  "cacheHits": 7,
  "cacheMisses": 3,
  "hitRate": "70%"
}

---

## 🌍 Deployed Usage

After deployment (e.g. Render):

https://your-app.onrender.com/proxy?url=<API_URL>  

👉 Developers can directly use your proxy in their apps

---

## 🎯 Real-World Use Case

Instead of:

axios.get("https://api.weather.com/data")

Use:

axios.get("https://your-proxy.onrender.com/proxy?url=https://api.weather.com/data")

### ✅ Benefits:
- Faster responses ⚡  
- Reduced API calls 📉  
- Avoid rate limits 🚫  

---

## ⚙️ CLI Options

| Option | Description | Default |
|--------|------------|--------|
| --port | Server port | 3000 |
| --ttl | Cache expiry (seconds) | 60 |
| --maxCache | Max cache size | 100 |

---

## 🏗️ Project Structure

src/  
├── server.js     # Main server  
├── cache.js      # LRU + TTL logic  
├── proxy.js      # API request handler  
├── metrics.js    # Metrics tracking  
├── cli.js        # CLI configuration  

---

## 🚀 Future Improvements

- Redis integration (distributed caching)
- API authentication (secure usage)
- Rate limiting
- Clean proxy routing (no query params)

---

## 👨‍💻 Author

Built to demonstrate **backend engineering, system design, and performance optimization concepts**

---

## ⭐ Support

If you found this useful, consider giving it a ⭐ on GitHub!
