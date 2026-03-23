const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all origins (adjust if you want to restrict)
app.use(cors());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "GeoNames Proxy is running 🚀" });
});

/**
 * Proxy endpoint for postalCodeSearchJSON
 * Usage: /postalCodeSearch?postalcode=78855&country=US
 */
app.get("/postalCodeSearch", async (req, res) => {
  const { postalcode, country } = req.query;

  if (!postalcode || !country) {
    return res
      .status(400)
      .json({ error: "postalcode and country are required query params" });
  }

  const username = process.env.GEONAMES_USERNAME || "krupal1";

  const geonamesUrl = `http://api.geonames.org/postalCodeSearchJSON`;

  try {
    const response = await axios.get(geonamesUrl, {
      params: { postalcode, country, username },
    });
    console.log("response: ", response);
    res.json(response.data);
  } catch (err) {
    console.error("GeoNames API error:", err.message);
    res
      .status(502)
      .json({ error: "Failed to fetch from GeoNames", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
