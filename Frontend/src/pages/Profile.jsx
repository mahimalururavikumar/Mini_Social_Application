import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      setSubmitting(true);
      let payload;
      if (avatarFile) {
        payload = new FormData();
        payload.append("username", username);
        payload.append("avatar", avatarFile);
      } else {
        payload = { username };
      }
      await updateProfile(payload);
      setMessage("Profile updated.");
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't update your profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <Paper className="card-surface" sx={{ p: 4, bgcolor: "transparent" }}>
        <Typography variant="h5" mb={3} sx={{ color: "var(--accent)" }}>
          Your profile
        </Typography>

        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={avatarPreview || undefined} sx={{ width: 64, height: 64, bgcolor: "var(--surface-hover)" }}>
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>
            <Button component="label" size="small" className="btn-ghost" sx={{ borderRadius: 2 }}>
              Change photo
              <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
            </Button>
          </Box>

          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
          <TextField label="Email" value={user?.email || ""} fullWidth disabled />

          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "flex-start" }} disabled={submitting}>
            {submitting ? "Saving…" : "Save changes"}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
