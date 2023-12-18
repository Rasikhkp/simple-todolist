import { connectDB } from "@/helperFunction/connectDB";
import prisma from "@/prisma";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const { email, password, name } = await req.json();
		console.log('email', email)
		console.log('password', password)
		console.log('name', name)

		const hashedPassword = await bcrypt.hash(password, 10);

		await connectDB();

		const newUser = await prisma.user.create({
			data: {
				id: nanoid(),
				email,
				name,
				hashedPassword,
			},
		});

		return NextResponse.json({ newUser }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const GET = async () => {
	try {
		await connectDB();

		const users = await prisma.user.findMany({
			include: {
				todos: true,
			},
		});

		console.log("users.todo", users[0].todos);

		return NextResponse.json({ users }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};
