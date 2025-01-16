import { useState, useEffect } from 'react';
//   import { navList } from './navList';

export const navList = [
    { label: "All Items", url: "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty" },
    { label: "Stories", url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty" },
    { label: "Jobs", url: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty" },
    { label: "Change Items", url: "https://hacker-news.firebaseio.com/v0/updates.json?print=pretty" },
  ];
  
  function NavBar() {
    const [selectedLabel, setSelectedLabel] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const fetchData = async (url) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1>Hacker News Client</h1>
        <nav>
          {navList.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelectedLabel(item.label);
                fetchData(item.url);
              }}
              style={{
                marginRight: '10px',
                background: item.label === selectedLabel ? '#007bff' : '#ccc',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: '20px' }}>
          <h2>{selectedLabel}</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          {!loading && !error && (
            <pre style={{ background: '#f8f9fa', padding: '10px', border: '1px solid #ddd' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  }
  
  export default NavBar;