import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState("");

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      setQuote(data.quote);
      setLastRefresh(new Date().toLocaleTimeString());
    } catch (error) {
      setQuote("Error fetching quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();

    const interval = setInterval(() => {
      fetchQuote();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Auto-Refresh Quote</h1>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <p className="quote">{quote}</p>
      )}

      <button onClick={fetchQuote}>Refresh Now</button>

      <p className="time">Last refresh: {lastRefresh || "—"}</p>
    </div>
  );
}
