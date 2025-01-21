import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavList';
import Footer from './Footer';

function App() {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [OldApitopStories, setOldTopStories] = useState([]);
  useEffect(() => {
    fetchApi()
  }, []);

  const fetchApi = () => {
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
  }

  if (loading) {
    return <div>Loading...</div>;
  }
 
  const navClick = (label) => {
    if(label === null){
      setOldTopStories(topStories)
      setTopStories([])
    }
    else{
      setTopStories(OldApitopStories)
    }
  }
  return (
    <div className="font-sans min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <NavBar onNavClick={navClick}/>
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        { topStories.length > 0 && <h1 className="text-3xl font-bold mb-6 text-center">Hacker News Top Stories</h1>}
        <ul className="space-y-6">
          {topStories.map((story) => (
            <li
              key={story.id}
              className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {story.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600">
                <strong>By:</strong> {story.by}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Score:</strong> {story.score}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default App;