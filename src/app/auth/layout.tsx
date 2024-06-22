import Footer from "@/components/footer";
import { HelloNav } from "@/components/hello-nav";

const AuthLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
	return ( 
		<div className="h-full md:px-5 px-2 flex flex-col justify-between bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover">
			<HelloNav/>
			{children}
			<Footer/>
		</div>
	);
}
   
export default AuthLayout;