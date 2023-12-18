import { connectDB } from "@/helperFunction/connectDB";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const PUT = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		const { todo } = await req.json();

		await connectDB();

		const updatedTodo = await prisma.todo.update({
			where: {
				id,
			},
			data: {
				todo,
			},
		});

		return NextResponse.json({ updatedTodo }, { status: 201 });
	} catch (error: any) {
		console.log(error.message);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const DELETE = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		console.log("id", id);
		await connectDB();

		const deletedTodo = await prisma.todo.delete({
			where: {
				id,
			},
		});

		const todos = await prisma.todo.findMany()

		return NextResponse.json({ todos }, { status: 201 });
	} catch (error: any) {
		console.log("error.message", error.message);

		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

export const GET = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await connectDB();

		const todo = await prisma.todo.findFirst({
			where: {
				id,
			},
		});

		return NextResponse.json({ todo }, { status: 201 });
	} catch (error) {
		console.log("error", error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};
