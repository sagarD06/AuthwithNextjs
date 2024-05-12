import { connectDB } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Succesfully Logged out!",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
