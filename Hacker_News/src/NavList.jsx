import { useState, useEffect } from 'react';
import './NavList.css';

export const navList = [
  { label: "All Items", url: "https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty" },
  { label: "Stories", url: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty" },
  { label: "Jobs", url: "https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty" },
  { label: "Change Items", url: "https://hacker-news.firebaseio.com/v0/updates.json?print=pretty" },
];

function NavBar({ onNavClick, onSearch }) {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!selectedLabel) {
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

  const handleSearchChange = (event) => {
    console.log('.....', data)
    setSearchQuery(event.target.value);
    onSearch(event.target.value)
  };

  const filteredData = data
    ? data.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="w-full">
      {/* Navigation Links */}
      <nav className="w-full bg-white shadow py-4 mb-6 fixed">
        <div className="flex justify-center space-x-4">
          {navList.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                handleNavClick(item.label)
                onNavClick(selectedLabel)
              }
              }
              className={`px-4 py-2 rounded ${item.label === selectedLabel ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-blue-500 hover:text-white transition`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div>
          <form>
            <label htmlFor="search">Search</label>
              <input
                type="search"
                id="search"
                placeholder="Search Article"
                className="px-4 py-2 border rounded-lg shadow-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ position: 'absolute', backgroundColor: 'white'}}/>
              <i style={{ fontSize: '24px' }} className="fa fa-search"></i>
          </form>
        </div>
      </nav>

      {/* Display Loading, Error, or Data */}
      <div className='pt-20'>
        {/* {!selectedLabel && <p>Welcome! Please select a category to view data.</p>} */}
        {loading && (
          <div className='loading-container'>
            <div className='loading-bar'></div>
          </div>
        )}
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
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Read more
                  </a>
                  <hr />
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
