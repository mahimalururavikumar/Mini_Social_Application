import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      // Use multipart only when there's an avatar to send; plain JSON otherwise
      let payload;
      if (avatarFile) {
        payload = new FormData();
        payload.append("username", form.username);
        payload.append("email", form.email);
        payload.append("password", form.password);
        payload.append("avatar", avatarFile);
      } else {
        payload = form;
      }
      await register(payload);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't create your account. Try different details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" px={2}>
      <Paper className="card-surface" sx={{ p: 4, width: "100%", maxWidth: 380, bgcolor: "transparent" }}>
        <Typography variant="h5" mb={0.5} sx={{ color: "var(--accent)" }}>
          Create your account
        </Typography>
        <Typography variant="body2" className="text-secondary" mb={3}>
          Join and start posting.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={avatarPreview || undefined} sx={{ width: 56, height: 56, bgcolor: "var(--surface-hover)" }} />
            <Button component="label" size="small" className="btn-ghost" sx={{ borderRadius: 2 }}>
              Add avatar (optional)
              <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
            </Button>
          </Box>

          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            helperText="At least 6 characters"
          />
          <Button type="submit" variant="contained" color="primary" size="large" disabled={submitting}>
            {submitting ? "Creating account…" : "Sign up"}
          </Button>
        </Box>

        <Typography variant="body2" className="text-secondary" mt={3} textAlign="center">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
