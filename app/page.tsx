import Todolist from "../components/Todolist";
import Nav from "../components/Nav";

export default async function Home() {
	return (
		<div className="h-screen grid grid-rows-[80px_auto] mx-auto w-[430px]">
			<Nav />
			<Todolist />
		</div>
	);
}
