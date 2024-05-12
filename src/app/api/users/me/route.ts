import { connectDB } from "@/dbConfig/connectDB";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utilities/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "Ivalid Token!" }, { status: 401 });
    }
    return NextResponse.json({
      message: "user details retrieved successfully!",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
