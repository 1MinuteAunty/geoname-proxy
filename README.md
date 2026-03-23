# GeoNames Proxy Server

A lightweight Express proxy that forwards requests to the GeoNames API — useful when `api.geonames.org` is blocked on your network.

---

## Deploy to Render (Free)

### Step 1 — Push to GitHub
1. Create a new GitHub repository (e.g. `geonames-proxy`)
2. Push all these files to it:
   ```
   git init
   git add .
   git commit -m "init"
   git remote add origin https://github.com/YOUR_USER/geonames-proxy.git
   git push -u origin main
   ```

### Step 2 — Create a Web Service on Render
1. Go to https://render.com and sign in
2. Click **New → Web Service**
3. Connect your GitHub repo
4. Set the following:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `GEONAMES_USERNAME` = `krupal1`  (or your GeoNames username)
6. Click **Deploy**

Render will give you a URL like: `https://geonames-proxy.onrender.com`

---

## API Usage

### Health check
```
GET https://your-render-url.onrender.com/
```

### Postal Code Search
```
GET https://your-render-url.onrender.com/postalCodeSearch?postalcode=78855&country=US
```

This is equivalent to calling:
```
http://api.geonames.org/postalCodeSearchJSON?postalcode=78855&country=US&username=krupal1
```

---

## Local Development

```bash
npm install
node server.js
# Server runs on http://localhost:3000
```
