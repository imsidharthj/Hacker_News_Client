import { useEffect, useState } from 'react';

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
      <h1>Hacker News Top Stories</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {topStories.map(story => (
          <li key={story.id} style={{ margin: '20px 0' }}>
            <h2>
              <a href={story.url} target="_blank" rel="noopener noreferrer" style={{ color: 'black' }}>
                {story.title}
              </a>
            </h2>
            <p>By: {story.by}</p>
            <p>Score: {story.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
