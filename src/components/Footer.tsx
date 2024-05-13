export default function Footer() {
    return (
        <footer className="">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:flex-col sm:items-center sm:justify-center sm:space-y-6 md:flex-row md:justify-between md:space-y-0">
                    <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-900 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                    <span className="block text-lg text-gray-900 sm:text-center dark:text-gray-400">
                        © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}