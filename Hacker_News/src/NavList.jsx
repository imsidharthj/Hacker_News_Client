import { useState, useEffect } from 'react';

export const navList = [
  { label: "All Items", url: "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty" },
  { label: "Stories", url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty" },
  { label: "Jobs", url: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty" },
  { label: "Change Items", url: "https://hacker-news.firebaseio.com/v0/updates.json?print=pretty" },
];

function NavBar() {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedLabel){
      setData(null);
      return;
    }

    const selectedNav = navList.find(item => item.label === selectedLabel);
    if (!selectedNav) return;

    setLoading(true);
    setError(null);

    fetch(selectedNav.url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    .then(data => {
      if (typeof data === 'number') {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)
          .then(res => res.json());
      } else if (Array.isArray(data)) {
        return Promise.all(
          data.slice(0, 10).map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
          )
        );
      } else if (data.items) {
        return Promise.all(
          data.items.slice(0, 10).map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
          )
        );
      }
    })
    .then(data => {
      const articles = Array.isArray(data) ? data.map(article => ({
        title: article.title || "No Title",
        url: article.url || "#",
        score: article.score || "N/A",
        by: article.by || "Anonymous",
      })) : [{
        title: data.title || "No Title",
        url: data.url || "#",
        score: data.score || "N/A",
        by: data.by || "Anonymous",
      }];
      setData(articles);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, [selectedLabel]);
  
  const handleNavClick = (label) => {
    if (selectedLabel === label) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(label);
    }
  };
  
  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        {navList.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.label)}
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

      {/* Display Loading, Error, or Data */}
      <div>
      {/* {!selectedLabel && <p>Welcome! Please select a category to view data.</p>} */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {Array.isArray(data) && (
          <ul style={{ color: 'black' }}>
            {data.map((article, index) => (
              <li key={index}>
                {/* <h3>{article.title}</h3> */}
                <p><strong>Title:</strong> {article.title}</p>
                <p><strong>Score:</strong> {article.score}</p>
                <p><strong>By:</strong> {article.by}</p>
                <p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </p>
                {/* <p>Score: {article.score}</p>
                <p>By: {article.by}</p> */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <hr />
    </div>
  );
}

export default NavBar;
