"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth"); 
    const authExpiry = localStorage.getItem("authExpiry"); 

    if (auth === "true" && authExpiry && new Date().getTime() < authExpiry) {
      setIsAuthenticated(true);
      router.push("/profile");
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          Welcome to Your Dashboard!
        </h1>
        <p className="mt-4 text-lg text-gray-700">You are logged in 🎉</p>
        <button
          onClick={() => {
            localStorage.removeItem("auth"); 
            localStorage.removeItem("authExpiry"); 
            router.push("/login");
          }}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
