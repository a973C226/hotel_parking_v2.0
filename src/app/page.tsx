import { HelloCard } from "@/components/hello-card";
import { HelloNav } from "@/components/hello-nav";

export default function StartPage() {
	return (
		<div className="h-full flex flex-col items-center justify-center md:bg-[url('https://drozdov-partners.com/wp-content/uploads/collection-garage-3-min.jpg')] bg-[url('https://www.fubiz.net/wp-content/uploads/2017/09/Renault_SYMBIOZ6.jpg')] bg-cover bg-center">
			<HelloNav className="fixed top-0 left-0"/>
			<HelloCard/>
		</div>
	);
}
