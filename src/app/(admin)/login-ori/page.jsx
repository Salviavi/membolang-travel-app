"use client";

import { useState } from "react";
import axios from "axios";
import { setCookies } from "@/utilities/utils";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", // ← your actual API key here
          },
        }
      );

      await setCookies("token", res.data.token);
      await setCookies("userData", JSON.stringify(res.data.data));
      console.log("Login successful:", res);
      alert("Login Success!");

      if (res.data.data.role === "admin") {
        window.location.href = "/dashboard";
      } else if (res.data.data.role === "user") {
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
