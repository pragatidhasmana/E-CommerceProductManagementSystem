import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, TextField, Card, CardContent } from "@mui/material";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://yourapi.com/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home or login
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" style={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            E-Commerce Product Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      
      {/* Login Form */}
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",          
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
        }}
      >
        <Card style={{ width: 400, padding: 30, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Login
            </Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
