"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user); 
      } else {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
      <p className="text-lg mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg mb-4">
        <strong>Mobile:</strong> {user.mobile}
      </p>

      <button
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          localStorage.removeItem("auth");
          localStorage.removeItem("authExpiry");
          router.push("/login");
        }}
        className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
