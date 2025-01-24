import { NextResponse } from "next/server"
import { db } from "@/server/db"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: email }, { name: name }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or name already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Signup Error:", error)
    return NextResponse.json(
      { error: "Failed to sign up user" },
      { status: 500 }
    )
  }
}
