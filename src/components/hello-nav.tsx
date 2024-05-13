const HelloNav = () => {
    return (
        <nav className="fixed top-0 w-full px-0">
            <div className=" max-w-screen-3xl flex flex-wrap items-center justify-end mx-4 p-4 rounded-lg">
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-slate-300/80 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a href="/auth/sign-in" className="block px-5 py-1 text-xl font-bold text-gray-900 bg-slate-300/50 rounded hover:bg-slate-300/80 md:border-0 md:hover:text-blue-700" aria-current="page">
                            Войти
                        </a>
                    </li>
                    <li>
                        <a href="/auth/sign-up" className="block px-5 py-1 text-xl font-bold text-gray-900 bg-slate-300/50 rounded hover:bg-slate-300/80 md:border-0 md:hover:text-blue-700" aria-current="page">
                            Создать аккаунт
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export { HelloNav }