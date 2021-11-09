import { useEffect, useState } from 'react'
import Map from './components/Map'
import CarComponent from './components/CarComponent'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { carList } from '../utils/carList'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const Confirm = () => {
    const [pickupCoordinates, setPickupCoordinates] = useState()
    const [destinationCoordinates, setDestinationCoordinates] = useState()
    const [service, setService] = useState('UberX')
    const [rideDuration, setRideDuration] = useState(0)

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

    useEffect(() => {
        if (pickupCoordinates && destinationCoordinates) {
            fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?access_token=pk.eyJ1IjoiZ2F1dGFtcGIiLCJhIjoiY2tzNGVzOHcxMWI2YjJ1cW12bjhmd3J6NiJ9._r1cFrkSyBDABOpDBwfIlg`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setRideDuration(data.routes[0].duration / 100)
                })
        }
    }, [pickupCoordinates, destinationCoordinates])

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            <Head>
                <title>Confirm</title>
            </Head>

            <div className="flex flex-1 h-1/2 relative">
                <Map
                    pickup={pickupCoordinates}
                    destination={destinationCoordinates}
                />

                <Link href="/search" passHref>
                    <div className="absolute flex mt-4 ml-4 bg-gray-200 rounded-full p-1 cursor-pointer">
                        <ArrowLeftIcon className="h-8" />
                    </div>
                </Link>
            </div>

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
                                price={(rideDuration * car.multiplier).toFixed(
                                    2
                                )}
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
