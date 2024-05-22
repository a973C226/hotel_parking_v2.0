import Footer from "@/components/footer";
import StartNavigation from "@/components/start-navigation";

const AuthLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
	return ( 
		<div className="h-full px-5 flex flex-col justify-between bg-[url('https://www-europe.infiniti-cdn.net/content/dam/Infiniti/entryway/vehicles/qx50/2019/find-your-finish/QM1-lunar-white-swatch.jpg')] bg-cover">
			<StartNavigation/>
			{children}
			<Footer/>
		</div>
	);
}
   
export default AuthLayout;