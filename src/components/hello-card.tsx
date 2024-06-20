const HelloCard = () => {
    return (
        <div className="lg:w-[800px] absolute left-0 lg:items-start items-center lg:bg-slate-300/50 bg-slate-300/80 p-5 lg:pl-40 pl-10 rounded-lg">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Ищете удобное место для своего автомобиля?
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-800 lg:text-2xl  dark:text-gray-800">
                Ваш автомобиль будет в безопасности - мы соблюдаем высокие стандарты безопасности и контролируем доступ к парковкам.
            </p>
            <a href="/prices" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-blue-300">
                Узнайте больше
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
    )
}

export { HelloCard };