
import Footer from "@/components/footer";
import Heading from "@/components/Heading";
import Navigation from "@/components/navigation";
import { getSession } from "@/lib/utils/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	// const isAuth = getSession()
	// const router = useRouter()
	// if (!isAuth) {
	// 	router.push("/auth/sign-in")
	// }
	return (
		<main>
            Dashboard
		</main>
	);
}
