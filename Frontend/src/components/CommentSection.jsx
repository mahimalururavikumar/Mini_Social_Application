import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import api from "../api/axios";
import { timeAgo } from "../utils/time";

export default function CommentSection({ postId, comments, onCommentAdded }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      setSubmitting(true);
      const res = await api.post(`/posts/${postId}/comment`, { text: text.trim() });
      onCommentAdded(res.data.comments ?? res.data);
      setText("");
    } catch {
      // Keep it low-key inline rather than a blocking alert
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
      {comments.length > 0 && (
        <div className="mb-2" style={{ maxHeight: 220, overflowY: "auto" }}>
          {comments.map((c) => {
            const avatarUrl = c.user?.avatarUrl || c.avatarUrl;
            const username = c.username || c.user?.username;
            return (
              <div key={c._id || `${username}-${c.createdAt}`} className="mb-2 small d-flex gap-2 align-items-start">
                {avatarUrl ? (
                  <Image src={avatarUrl} roundedCircle style={{ width: 24, height: 24, objectFit: "cover" }} />
                ) : (
                  <div
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "var(--surface-hover)",
                      color: "var(--accent)",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {username?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="fw-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                    {username}
                  </span>{" "}
                  <span className="text-secondary" style={{ fontSize: "0.8em" }}>{timeAgo(c.createdAt)}</span>
                  <div style={{ color: "var(--text-primary)" }}>{c.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Form onSubmit={handleSubmit} className="d-flex gap-2">
        <Form.Control
          size="sm"
          placeholder="Write a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            background: "var(--surface-hover)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />
        <Button type="submit" size="sm" className="btn-accent" disabled={submitting || !text.trim()}>
          Send
        </Button>
      </Form>
    </div>
  );
}
