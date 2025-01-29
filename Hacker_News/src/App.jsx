import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavList';
import Footer from './Footer';

function App() {
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [OldApitopStories, setOldTopStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [numArticles, setNumArticles] = useState(5);

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
      const top5StoryIds = data.slice(0, 20);
      return Promise.all(
        top5StoryIds.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        )
      );
    })
    .then(stories => {
      // setTopStories(stories);
      // setLoading(false);
      setTopStories(stories);
      setOldTopStories(stories);
      setFilteredStories(stories.slice(0, numArticles));
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
 
  // const navClick = (label) => {
  //   if(label === null){
  //     setOldTopStories(topStories)
  //     setTopStories([])
  //   }
  //   else{
  //     setTopStories(OldApitopStories)
  //   }
  // }

  const navClick = (label) => {
    if (label === null) {
      setOldTopStories(topStories);
      setTopStories([]);
      setFilteredStories([]);
    } else {
      setTopStories(OldApitopStories);
      setFilteredStories(OldApitopStories.slice(0, numArticles));
    }
  };

  // const handleNumArticlesChange = (event) => {
  //   const numArticles = Number(event.target.value);
  //   setNumStories(numArticles);
  //   const filteredStories = topStories.slice(0, numArticles);
  //   setFilteredStories(filteredStories);
  // };
  const handleNumArticlesChange = (event) => {
    const num = Number(event.target.value);
    setNumArticles(num);
    setFilteredStories(topStories.slice(0, num));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col items-center bg-gray-100 text-gray-800">
      <NavBar onNavClick={navClick}/>
      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        { topStories.length > 0 && <h1 className="text-3xl font-bold mb-6 text-center">Hacker News Top Stories</h1>}
        <div style={{left: 0, position: 'fixed'}}>
          <label htmlFor="numArticles">Number of Stories: </label>
            <select id="numArticles" value={numArticles} onChange={handleNumArticlesChange} style={{ background: 'white'}}>
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        <ul className="space-y-6">
          {filteredStories.map((story) => (
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