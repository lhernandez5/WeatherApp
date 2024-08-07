const rapidAPIKey = process.env.REACT_APP_RAPID_API_KEY;
const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": rapidAPIKey,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/";
export const WEATHER_API_KEY = weatherAPIKey;
