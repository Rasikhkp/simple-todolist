import AuthPage from "@/components/AuthPage";

export default function page() {
	return (
		<AuthPage
			toRegister="Not a member?"
			greeting="Hello Again!"
			cta="Welcome back you've been missed!"
			isSignUp={false}
		/>
	);
}
