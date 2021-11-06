import { useEffect, useState } from 'react'
import Map from './components/Map'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Confirm = () => {
    const [pickupCoordinates, setPickupCoordinates] = useState()
    const [destinationCoordinates, setDestinationCoordinates] = useState()

    const router = useRouter()
    const { pickup, destination } = router.query

    const getPickupCoordinates = () => {
        // const pickup = 'Santa Monica'
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
                new URLSearchParams({
                    access_token:
                        'pk.eyJ1IjoiZ2F1dGFtcGIiLCJhIjoiY2tzNGVzOHcxMWI2YjJ1cW12bjhmd3J6NiJ9._r1cFrkSyBDABOpDBwfIlg',
                    limit: 1,
                })
        )
            .then((response) => response.json())
            .then((data) => {
                setPickupCoordinates(data.features[0].center)
            })
    }

    const getDestinationCoordinates = () => {
        // const destination = 'Los Angeles'
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?` +
                new URLSearchParams({
                    access_token:
                        'pk.eyJ1IjoiZ2F1dGFtcGIiLCJhIjoiY2tzNGVzOHcxMWI2YjJ1cW12bjhmd3J6NiJ9._r1cFrkSyBDABOpDBwfIlg',
                    limit: 1,
                })
        )
            .then((response) => response.json())
            .then((data) => {
                setDestinationCoordinates(data.features[0].center)
            })
    }

    useEffect(() => {
        getPickupCoordinates()
        getDestinationCoordinates()
    }, [])

    return (
        <div className="flex h-screen flex-col">
            <Head>
                <title>Confirm</title>
            </Head>
            <Map
                pickup={pickupCoordinates}
                destination={destinationCoordinates}
            />

            <div className="flex flex-1 flex-col items-center p-2">
                <h1 className="text-gray-400 text-sm border-b border-gray-200 w-full flex justify-center pb-1">
                    Choose a ride, or swipe up for more
                </h1>
            </div>
        </div>
    )
}

export default Confirm
