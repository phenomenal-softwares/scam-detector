import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const SearchResults = ({ result }) => {
  const getRiskLabel = (classValue) => {
    switch (classValue) {
      case 1:
        return { label: "Highly Trusted", color: "#28a745", icon: "✅" };
      case 2:
        return { label: "Safe", color: "#17a2b8", icon: "🟢" };
      case 3:
        return { label: "Suspicious", color: "#ffc107", icon: "🟠" };
      case 4:
        return { label: "High Risk", color: "#dc3545", icon: "🔴" };
      case 5:
        return { label: "Scam", color: "#6c757d", icon: "🚨" };
      default:
        return { label: "Unknown", color: "#343a40", icon: "❓" };
    }
  };

  const risk = getRiskLabel(result.class);

  return (
    <div className="search-results">
      <h2><FaShieldAlt /> Security Report</h2>
      <div className="result-container">
        <div className="result-item">
          <strong>Domain:</strong>
          <p>{result.domain}</p>
        </div>
        <div className="result-item">
          <strong>Risk Level:</strong>
          <p style={{ color: risk.color }}>
            {risk.icon} {risk.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
