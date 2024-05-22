export default function Footer() {
    return (
        <footer className="relative w-full bottom-0 left-0 ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:flex-col sm:items-center sm:justify-center sm:space-y-6 md:flex-row md:justify-between md:space-y-0">
                    <ul className="flex flex-wrap items-center mb-6 text-lg font-medium text-gray-900 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">О нас</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Цены</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Как доехать?</a>
                        </li>
                    </ul>
                    <span className="block text-lg text-gray-900 sm:text-center dark:text-gray-400">
                        © 2024 <a href="https://flowbite.com/" className="hover:underline">WONE-IT™</a>. Все права защищены.
                    </span>
                </div>
            </div>
        </footer>
    )
}