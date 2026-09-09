import { useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const resetForm = () => {
    setText("");
    clearImage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim() && !imageFile) {
      setError("Write something or add an image before posting.");
      return;
    }

    const formData = new FormData();
    if (text.trim()) formData.append("text", text.trim());
    if (imageFile) formData.append("image", imageFile);

    try {
      setSubmitting(true);
      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onPostCreated(res.data.post ?? res.data);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't publish that post. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="card-surface mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={`What's on your mind, ${user?.username || "there"}?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                background: "var(--surface-hover)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                resize: "none",
              }}
            />
          </Form.Group>

          {previewUrl && (
            <div className="position-relative d-inline-block mb-2">
              <Image src={previewUrl} rounded style={{ maxHeight: 220, maxWidth: "100%" }} />
              <Button
                size="sm"
                variant="dark"
                className="position-absolute top-0 end-0 m-1"
                onClick={clearImage}
              >
                ✕
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="py-2 small">
              {error}
            </Alert>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <Form.Group controlId="post-image">
              <Form.Label className="btn btn-ghost btn-sm mb-0">
                📷 Add image
                <Form.Control
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
              </Form.Label>
            </Form.Group>

            <Button type="submit" className="btn-accent" disabled={submitting}>
              {submitting ? "Posting…" : "Post"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
