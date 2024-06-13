export default function Footer() {
    return (
        <footer className="w-full ">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:space-y-0">
                    <ul className="flex gap-4 items-center mb-6 text-sm mobile:text-lg font-medium text-gray-900 sm:mb-0 dark:text-gray-400 hidden md:flex">
                        <li>
                            <a href="/prices" className="hover:underline">Цены</a>
                        </li>
                        <li>
                            <a href="/route-to" className="hover:underline">Как доехать?</a>
                        </li>
                        <li>
                            <a href="/contacts" className="hover:underline">Контакты</a>
                        </li>
                    </ul>
                    <div className="flex flex-col md:flex-row md:gap-4 items-center text-sm mobile:text-lg text-gray-900 sm:text-center">
                        <div className="block">© 2024 <a href="https://flowbite.com/" className="hover:underline">HOTEL-PARKING™</a>.</div>
                        <div className="block">Все права защищены.</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}