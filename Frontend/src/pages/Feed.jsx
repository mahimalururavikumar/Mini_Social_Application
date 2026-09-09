import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import api from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

// Normalizes either { posts, nextCursor, hasMore } or a plain array response
function normalizeFeedResponse(data) {
  if (Array.isArray(data)) {
    return { posts: data, nextCursor: null, hasMore: false };
  }
  return {
    posts: data.posts ?? [],
    nextCursor: data.nextCursor ?? null,
    hasMore: data.hasMore ?? false,
  };
}

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const loadFeed = useCallback(async (cursor = null) => {
    const params = cursor ? { cursor } : {};
    const res = await api.get("/posts", { params });
    return normalizeFeedResponse(res.data);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadFeed()
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts);
        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      })
      .catch(() => !cancelled && setError("Couldn't load the feed. Refresh to try again."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [loadFeed]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const data = await loadFeed(nextCursor);
      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      setError("Couldn't load more posts.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handlePostCreated = (post) => setPosts((prev) => [post, ...prev]);
  const handlePostDeleted = (postId) => setPosts((prev) => prev.filter((p) => p._id !== postId));

  return (
    <div className="page-shell">
      <CreatePost onPostCreated={handlePostCreated} />

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <Loader minHeight="40vh" />
      ) : posts.length === 0 ? (
        <div className="text-center text-secondary py-5">
          Nothing here yet — be the first to post something.
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onPostDeleted={handlePostDeleted} />
          ))}

          {hasMore && (
            <div className="text-center mt-3">
              <Button className="btn-ghost" onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? "Loading…" : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
