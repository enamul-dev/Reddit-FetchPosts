import { useState } from "react";

function App() {
  const [subreddit, setSubreddit] = useState("learnprogramming");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRedditPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const url = `https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=${encodeURIComponent(subreddit)}&limit=25&sort=desc`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch Reddit posts");
      }

      const data = await response.json();

      setPosts(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Reddit Explorer</h1>

      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit"
      />

      <button onClick={fetchRedditPosts}>
        Fetch Posts
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {posts.map((post) => (
  <div key={post.id}>
    <h2>{post.title}</h2>
    <p>Author: {post.author}</p>
    <p>Upvotes: {post.score}</p>
    <p>Comments: {post.num_comments}</p>
    <hr />
  </div>
))}
    </div>
  );
}

export default App;