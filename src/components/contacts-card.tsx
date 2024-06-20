import { YMaps } from "@pbe/react-yandex-maps"
import YandexMap from "./ui/yandex-map"
import { Card } from "./ui/card"

export const ContactsCard = () => {
    return (
        <YMaps query={{ 
            lang: 'ru_RU',
            ns: "use-load-option",
            load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
        }} >
            <div className="flex flex-col items-center">
                {/* <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Наши контакты</h1> */}
                <div className="flex flex-col xl:flex-row items-center">
                    <div className="border-sky-400 border-t-2 border-r-2 border-l-2 xl:border-none xl:z-50 w-full xl:w-auto xl:absolute bg-white xl:ml-10 px-10 py-6 xl:bg-slate-50/80 rounded-t-xl xl:rounded-xl space-y-1">
                        <h1 className="text-xl lg:text-2xl 2xl:text-4xl font-bold mb-4 2xl:mb-6">Наши контакты</h1>
                        <p className="text-base lg:text-lg 2xl:text-2xl font-semibold">Телефон: +7 (999) 456-7890</p>
                        <p className="text-base lg:text-lg 2xl:text-2xl font-semibold">Telegram: @hotel_parking</p>
                        <p className="text-base lg:text-lg 2xl:text-2xl font-semibold">Почта: info@hotelparking.com</p>
                        <p className="text-base lg:text-lg 2xl:text-2xl font-semibold">Адрес: Санкт-Петербург, наб. реки Мойки, 61</p>
                        <p className="text-base lg:text-lg 2xl:text-2xl font-semibold">Часы работы: Пн-Пт: 9:00 - 18:00</p>
                    </div>
                    <div className="border-sky-400 border-b-2 border-r-2 border-l-2 xl:border-none rounded-b-xl xl:rounded-xl" id="map"><YandexMap coords={[59.934972, 30.318075]} width={window.innerWidth-40} height={window.innerHeight/1.5}/></div>
                    
                </div>
            </div>
        </YMaps>
    )
}