"use client"

interface MapLocationRadioProps {
	setHotel: (e: any) => void;
};

export default function MapLocationRadio({ setHotel }: MapLocationRadioProps) {

    return (
        <ul className="flex flex-col w-full gap-4 md:justify-center items-center">
            <li>
                <input onClick={setHotel} type="radio" id="palace-bridge-hotel" name="hotel-location" value="palace-bridge-hotel" className="hidden peer"/>
                <label htmlFor="palace-bridge-hotel" className="inline-flex items-center justify-between w-auto text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:border-4 hover:text-gray-600 hover:bg-gray-100">                          
                    <figure className="relative max-w-72 transition-all duration-300 cursor-pointer filter grayscale peer-checked:grayscale-0 hover:grayscale-0">
                        <img className="rounded-sm" src="https://optim.tildacdn.com/tild3564-6336-4364-b036-343561393032/-/format/webp/8G7A6049.jpg" alt="PALACE BRIDGE HOTEL"></img>
                        <figcaption className="absolute px-4 text-2xl text-white bottom-6">
                            <p>PALACE BRIDGE HOTEL</p>
                        </figcaption>
                    </figure>
                </label>
            </li>
            <li>
                <input onClick={setHotel} type="radio" id="vasilievsky-hotel" name="hotel-location" value="vasilievsky-hotel" className="hidden peer"/>
                <label htmlFor="vasilievsky-hotel" className="inline-flex items-center justify-between w-auto text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:border-4 hover:text-gray-600 hover:bg-gray-100">                           
                    <figure className="relative max-w-72 transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                        <img className="rounded-sm" src="https://optim.tildacdn.com/tild6161-6532-4431-b861-373231636438/-/format/webp/VAS_Facade_and_entra.jpg" alt="VASILIEVSKY HOTEL"></img>
                        <figcaption className="absolute px-4 text-2xl text-white bottom-6">
                            <p>VASILIEVSKY HOTEL</p>
                        </figcaption>
                    </figure>
                </label>
            </li>
            <li>
                <input onClick={setHotel} type="radio" id="olympia-garden-hotel" name="hotel-location" value="olympia-garden-hotel" className="hidden peer"/>
                <label htmlFor="olympia-garden-hotel" className="inline-flex items-center justify-between w-auto text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:border-4 hover:text-gray-600 hover:bg-gray-100">                           
                    <figure className="relative max-w-72 transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
                        <img className="rounded-sm" src="https://optim.tildacdn.com/tild3166-3935-4037-a235-613865616562/-/format/webp/MrGron-012.jpg" alt="OLYMPIA GARDEN HOTEL"></img>
                        <figcaption className="absolute px-4 text-2xl text-white bottom-6">
                            <p>OLYMPIA GARDEN HOTEL</p>
                        </figcaption>
                    </figure>
                </label>
            </li>
        </ul>
    )
}