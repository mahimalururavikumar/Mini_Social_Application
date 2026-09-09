import { useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import { timeAgo } from "../utils/time";

export default function PostCard({ post, onPostDeleted }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [liking, setLiking] = useState(false);

  const isLiked = Boolean(
    user &&
      likes.some((l) =>
        typeof l === "string"
          ? l === user.username
          : l.username === user.username || (user.id && (l.user === user.id || l.user?._id === user.id))
      )
  );

  const currentUserId = user?.id || user?._id;
  const postUserId = typeof post.user === "object" ? (post.user?._id || post.user?.id) : post.user;
  const isOwner = Boolean(user && (postUserId === currentUserId || post.username === user.username));
  const avatarUrl = post.user?.avatarUrl || post.avatarUrl;

  const handleLike = async () => {
    if (liking || !user) return;
    const wasLiked = isLiked;
    const filterUser = (l) => (typeof l === "string" ? l !== user.username : l.username !== user.username);
    setLikes((prev) =>
      wasLiked
        ? prev.filter(filterUser)
        : [...prev, { user: user.id || user._id, username: user.username }]
    );
    try {
      setLiking(true);
      const res = await api.post(`/posts/${post._id}/like`);
      if (res.data.likes) setLikes(res.data.likes);
    } catch {
      setLikes((prev) =>
        wasLiked
          ? [...prev, { user: user.id || user._id, username: user.username }]
          : prev.filter(filterUser)
      );
    } finally {
      setLiking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${post._id}`);
      onPostDeleted?.(post._id);
    } catch {
      // no-op - the post stays visible if deletion failed
    }
  };

  return (
    <Card className="card-surface mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center gap-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                roundedCircle
                style={{ width: 38, height: 38, objectFit: "cover" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--surface-hover)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                }}
              >
                {post.username?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-primary)" }}>{post.username}</div>
              <div className="text-secondary small">{timeAgo(post.createdAt)}</div>
            </div>
          </div>

          {isOwner && (
            <Dropdown align="end">
              <Dropdown.Toggle
                as="span"
                bsPrefix="no-caret"
                style={{ cursor: "pointer", color: "var(--text-secondary)", padding: "0 6px" }}
              >
                ⋯
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={handleDelete} className="text-danger">
                  Delete post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>

        {post.text && <p className="mt-3 mb-2" style={{ whiteSpace: "pre-wrap", color: "var(--text-primary)" }}>{post.text}</p>}

        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            fluid
            rounded
            className="mt-1"
            style={{ maxHeight: 420, width: "100%", objectFit: "cover" }}
          />
        )}

        <div className="d-flex align-items-center gap-2 mt-3">
          <button className={`like-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
            {isLiked ? "♥" : "♡"} {likes.length}
          </button>
          <button className="like-btn" onClick={() => setShowComments((s) => !s)}>
            💬 {comments.length}
          </button>
        </div>

        {showComments && (
          <CommentSection postId={post._id} comments={comments} onCommentAdded={setComments} />
        )}
      </Card.Body>
    </Card>
  );
}
