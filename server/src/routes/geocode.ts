/**
 * geocode.ts
 * ------------------------
 * Handles geocoding requests from the frontend.
 * Accepts an address string in the POST body,
 * sends it to the Google Maps Geocoding API,
 * and returns latitude + longitude coordinates.
 */
import { Router } from "express";
import axios from "axios";

export const geocodeRouter = Router();

/**
 * POST /api/geocode
 * Response example:
        {
            "address": "Santa Monica Beach, Santa Monica, CA",
            "lat": 34.0003576,
            "lng": -118.4861734
        }
 */
geocodeRouter.post("/", async (req, res) => {
  try {
    const { address } = req.body;
    console.log("Request body:", req.body);


    // check for validate input
    if (!address || address.trim().length === 0) {
      return res.status(400).json({ error: "Address is required" });
    }

    // load API key from environment variables
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // split input into separate lines + remove empty lines
    const addressList = address
    .split("\n")
    .map((a: string) => a.trim())
    .filter((a: string) => a.length > 0);  

    const results = [];

    for (const addr of addressList) {
      
      // encode address for safe URL transmission
      const encoded = encodeURIComponent(addr);

      // construct Google Geocoding API request URL
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;

      // send request to Google Maps API
      const response = await axios.get(url);
      const data = response.data.results;

      // extract geographic coordinates from response
      if (data && data.length > 0) {
        const location = data[0].geometry.location;
        // send geocoded results back to frontend
        results.push({
          address: addr,
          lat: location.lat,
          lng: location.lng
        });
      } else {
        results.push({
          address: addr,
          error: "No results found"
        });
      }
    }

    res.json({ results });


  } catch (err) {
    // log error on server side for debugging
    console.error("Geocoding error:", err);
    res.status(500).json({ error: "Server error" });
  }
});