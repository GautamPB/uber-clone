// mapbox default styles: mapbox://styles/mapbox/streets-v11
import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react'

mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2F1dGFtcGIiLCJhIjoiY2tzNGVzOHcxMWI2YjJ1cW12bjhmd3J6NiJ9._r1cFrkSyBDABOpDBwfIlg'

const Map = ({ pickup, destination }) => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/gautampb/ckvmvkd9w287u14mwslt61b3e',
            center: [-99.29011, 39.39172],
            zoom: 3,
        })

        console.log(pickup, destination)

        if (pickup) {
            addMarkerToMap(map, pickup)
        }

        if (destination) {
            addMarkerToMap(map, destination)
        }

        if (pickup && destination) {
            map.fitBounds([pickup, destination], { padding: 60 })
        }
    }, [pickup, destination])

    const addMarkerToMap = (map, coordinates) => {
        const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }

    return <div id="map" className="flex-1" />
}

export default Map
