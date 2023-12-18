import { connectDB } from "@/helperFunction/connectDB";
import prisma from "@/prisma";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		await connectDB();

		const todos = await prisma.todo.findMany({
			include: {
				user: true,
			}
		});

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (req: Request) => {
	try {
		const { userId, todo } = await req.json();
		console.log('userId', userId)
		console.log('todo', todo)

		await connectDB();
		
		const newTodo = await prisma.todo.create({
			data: {
				id: nanoid(),
				userId,
				todo,
			},
			include: {
				user: true,
			}
		});

		return NextResponse.json({ newTodo }, { status: 201 });
	} catch (error) {
		console.log("error", error);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const DELETE = async (req: Request) => {
	try {
		const { id } =  await req.json()
		console.log("delete id di todo/route.ts", id);
		await connectDB();

		await prisma.todo.delete({
			where: {
				id,
			},
		});

		const todos = await prisma.todo.findMany({
			include: {
				user: true,
			}
		});

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error: any) {
		console.log("error.message", error.message);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const PUT = async(req: Request) => {
	try {
		const { id, todo } = await req.json()

		await connectDB()
		
		await prisma.todo.update({
			where: {
				id
			},
			data: {
				todo
			}
		})

		const todos = await prisma.todo.findMany({
			include: {
				user: true,
			}
		});

		return NextResponse.json({ todos }, { status: 201 })
	} catch (error) {
		console.log('error', error)

		return NextResponse.json({ message: "Server Error" }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}
