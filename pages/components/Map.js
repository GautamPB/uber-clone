// mapbox default styles: mapbox://styles/mapbox/streets-v11
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react'

mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2F1dGFtcGIiLCJhIjoiY2tzNGVzOHcxMWI2YjJ1cW12bjhmd3J6NiJ9._r1cFrkSyBDABOpDBwfIlg'

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/gautampb/ckvmvkd9w287u14mwslt61b3e',
            center: [-99.29011, 39.39172],
            zoom: 3,
        })
    }, [])

    return <div id="map" className="flex-1"></div>
}

export default Map
