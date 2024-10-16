import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select(
      "mobile name email"
    );
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      message: "Authenticated",
      userId: decoded.userId,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
