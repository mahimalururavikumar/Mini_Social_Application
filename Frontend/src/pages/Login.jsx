import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await login(form.email, form.password);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't log you in. Check your details and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" px={2}>
      <Paper className="card-surface" sx={{ p: 4, width: "100%", maxWidth: 380, bgcolor: "transparent" }}>
        <Typography variant="h5" mb={0.5} sx={{ color: "var(--accent)" }}>
          Welcome back
        </Typography>
        <Typography variant="body2" className="text-secondary" mb={3}>
          Log in to see what people are sharing.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
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
          />
          <Button type="submit" variant="contained" color="primary" size="large" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </Button>
        </Box>

        <Typography variant="body2" className="text-secondary" mt={3} textAlign="center">
          New here? <Link to="/register">Create an account</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
