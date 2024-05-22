import { YMaps, Map, ZoomControl, Placemark, RouteEditor, RoutePanel } from '@pbe/react-yandex-maps';

type MapProps = {
    coords: number[]
}

export default function YandexMap(props: MapProps) {
    return (
        <div className='rounded-md'>
            <Map state={{ center: props.coords, zoom: 16, controls: ["zoomControl", "fullscreenControl"] }} width={window.innerWidth/3} height={window.innerHeight/1.5}>
                <Placemark geometry={props.coords} />
            </Map>
        </div>
        
    )
}