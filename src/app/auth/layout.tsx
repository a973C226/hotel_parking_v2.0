import Footer from "@/components/footer";
import Navigation from "@/components/navigation";

const AuthLayout = ({ 
		children
	}: { 
		children: React.ReactNode
	}) => {
	return ( 
			<div className="h-full flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
				<Navigation/>
				{children}
				<Footer/>
			</div>
	);
}
   
export default AuthLayout;