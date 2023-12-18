import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/helperFunction/connectDB";
import prisma from "@/prisma";

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "Email" },
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				try {
					console.log("credentials", credentials);
					if (!credentials?.email || !credentials?.password) {
						return null;
					}

					await connectDB();

					const user = await prisma.user.findFirst({
						where: {
							email: credentials.email,
						},
					});

					if (!user?.hashedPassword) return null;

					const isCorrectPassword = await bcrypt.compare(
						credentials.password,
						user.hashedPassword
					);

					if (isCorrectPassword) return user;

					return null;
				} catch (error) {
					console.log("error", error);

					return null;
				} finally {
					await prisma.$disconnect();
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			return { id: token.sub, ...session };
		},
		async signIn(whatever) {
			try {
				const user = whatever.user;
				const foundUser = await prisma.user.findFirst({
					where: {
						id: user.id,
					},
				});

				if (foundUser) return true;

				await connectDB();

				if (!user.email || !user.name || !user.id || !user.image)
					return false;

				await prisma.user.create({
					data: {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
					},
				});

				return true;
			} catch (error) {
				console.log("error", error);

				return false;
			} finally {
				await prisma.$disconnect();
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
