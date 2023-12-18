import AuthPage from "@/components/AuthPage";

export default function page() {
	return (
		<AuthPage
			toLogin="Already have an account?"
			greeting="New Here?"
			cta="Sign up and discover great things"
			isSignUp={true}
		/>
	);
}
