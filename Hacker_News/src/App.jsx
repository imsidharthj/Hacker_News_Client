import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavList';
import Footer from './Footer';

function App() {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const top5StoryIds = data.slice(0, 5);
        return Promise.all(
          top5StoryIds.map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
          )
        );
      })
      .then(stories => {
        setTopStories(stories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <NavBar />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Hacker News Top Stories</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {topStories.map(story => (
          // <li key={story.id} style={{ margin: '20px 0' }}>
          <li
          key={story.id}
          style={{
            margin: '20px 0',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            background: '#f9f9f9',
            transition: 'transform 0.2s',
          }}
        >
          <h2>
            {/* <a href={story.url} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}> */}
            <a
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#007bff',
            }}
          >
                {story.title}
              </a>
            </h2>
            {/* <p>By: {story.by}</p>
            <p>Score: {story.score}</p> */}
            <p style={{ margin: '5px 0' }}>
            <strong>By:</strong> {story.by}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Score:</strong> {story.score}
            </p>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default App;