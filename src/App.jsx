import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./components/SearchResults";
import { FaSearch } from "react-icons/fa"; // Search icon
import { ImSpinner2 } from "react-icons/im"; // Spinning loader icon
import "./App.css"; // Importing styles

const extractDomain = (input) => {
  try {
    if (/^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(input)) {
      return input;
    }
    const url = new URL(input);
    return url.hostname.replace(/^www\./, "");
  } catch (error) {
    return input;
  }
};

const App = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchScamData = async () => {
    if (!domain) {
      setError("Please enter a domain.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    const cleanedDomain = extractDomain(domain);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const options = {
      method: "GET",
      url: `https://scampredictor.p.rapidapi.com/domain/${cleanedDomain}`,
      headers: {
        "x-rapidapi-host": "scampredictor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      console.log("API Response:", response.data);
      setResult({ domain: cleanedDomain, ...response.data });
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="app">
        <h1>Scam Detector 🔍</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter domain or URL..."
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <button onClick={fetchScamData} disabled={loading}>
            {loading ? <ImSpinner2 className="spinner" /> : <FaSearch />}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {result && <SearchResults result={result} />}
      </div>
      <footer>
        &copy; {new Date().getFullYear()} Phenomenal Productions. <br />
        All rights reserved.
      </footer>

    </div>
  );
};

export default App;
