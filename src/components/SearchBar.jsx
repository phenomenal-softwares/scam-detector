const SearchBar = ({ domain, setDomain, fetchScamData }) => {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g., example.com)"
        />
        <button onClick={fetchScamData}>Search</button>
      </div>
    );
  };
  
  export default SearchBar;
  