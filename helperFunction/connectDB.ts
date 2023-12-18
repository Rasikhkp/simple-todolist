import prisma from "../prisma";

export const connectDB = async () => {
	try {
		await prisma.$connect();
		console.log("mongodb connected")
	} catch (error) {
		console.log(error);
		throw new Error("Unable to connect to databse");
	}
};
