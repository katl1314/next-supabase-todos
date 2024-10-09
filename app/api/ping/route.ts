import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  console.log("Ping GET API income");
  return NextResponse.json({ message: "pong" });
};
