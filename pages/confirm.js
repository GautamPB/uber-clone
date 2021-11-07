import { useEffect, useState } from 'react'
import Map from './components/Map'
import CarComponent from './components/CarComponent'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { carList } from '../utils/carList'

const Confirm = () => {
    const [pickupCoordinates, setPickupCoordinates] = useState()
    const [destinationCoordinates, setDestinationCoordinates] = useState()
    const [service, setService] = useState('UberX')

    const router = useRouter()
    const { pickup, destination } = router.query

    const getPickupCoordinates = (pickup) => {
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

    const getDestinationCoordinates = (destination) => {
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
        getPickupCoordinates(pickup)
        getDestinationCoordinates(destination)
    }, [pickup, destination])

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            <Head>
                <title>Confirm</title>
            </Head>

            <Map
                pickup={pickupCoordinates}
                destination={destinationCoordinates}
            />

            <div className="flex flex-1 flex-col items-center p-2 h-1/2 lg:h-full">
                <h1 className="text-gray-400 text-sm border-b border-gray-200 w-full flex justify-center pb-1">
                    Choose a ride, or swipe up for more
                </h1>

                <div className="flex flex-col w-full overflow-y-scroll">
                    {carList.map((car, index) => (
                        <div
                            key={index}
                            onClick={() => setService(car.service)}
                        >
                            <CarComponent
                                image={car.imgUrl}
                                carType={car.service}
                                duration="5 mins away"
                                price={20.54}
                            />
                        </div>
                    ))}
                </div>

                <div className="bg-black text-white w-full flex items-center justify-center m-4 py-2 font-semibold text-lg rounded-lg cursor-pointer active:scale-90 transition">
                    <button>Confirm {service}</button>
                </div>
            </div>
        </div>
    )
}

export default Confirm
