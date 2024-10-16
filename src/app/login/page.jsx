"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const authExpiry = localStorage.getItem("authExpiry");

    if (auth === "true" && authExpiry && new Date().getTime() < authExpiry) {
      router.push("/profile");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem("auth", true);
        localStorage.setItem(
          "authExpiry",
          new Date().getTime() + 3 * 24 * 60 * 60 * 1000
        );

        alert("Login successful!");
        router.push("/profile");
      } else {
        const { message } = await res.json();
        alert(message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
