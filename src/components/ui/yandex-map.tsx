import { Map, ZoomControl, Placemark } from '@pbe/react-yandex-maps';

type MapProps = {
    coords: number[],
    width: number,
    height: number
}

export default function YandexMap(props: MapProps) {
    return (
        <div className='rounded-md'>
            <Map state={{ center: props.coords, zoom: 16, controls: ["fullscreenControl"] }} width={props.width} height={props.height}>
                <ZoomControl options={{ position: {right: 10, top: 100} }} />
                <Placemark geometry={props.coords} />
            </Map>
        </div>
        
    )
}