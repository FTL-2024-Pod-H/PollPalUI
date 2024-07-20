import React, {useState} from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // handle login
  const handleLogin = async () => {
    try {
      // Mock API call
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      toast.success(response.data.message);

      // Simulate storing the token from a successful login response
      const loginResponse = { data: { token: "mock-token" } };
      localStorage.setItem("token", loginResponse.data.token);

      // Navigate to another page, e.g., the dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Try again");
    }
  };

  

    return (
        <div className="login-container">
      <h1>Login to Poll Pal</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}>Go to register</button>
      <ToastContainer />
    </div>
  );
};


export default Login;