import { ArrowLeftIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const Search = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')

    return (
        <div className="bg-gray-200 h-screen space-y-4">
            <Head>
                <title>Search</title>
            </Head>

            <div className="bg-white p-5">
                <div className="space-y-4">
                    <Link href="/" passHref>
                        <ArrowLeftIcon className="h-8 cursor-pointer" />
                    </Link>

                    <div className="flex space-x-2 items-center">
                        <div className="flex flex-col items-center">
                            <Image
                                width={20}
                                height={20}
                                src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"
                                alt=""
                                className="h-3"
                            />
                            <Image
                                width={20}
                                height={40}
                                src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
                                alt="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
                            />
                            <Image
                                width={20}
                                height={20}
                                src="https://img.icons8.com/windows/50/000000/square-full.png"
                                alt=""
                                className="h-3"
                            />
                        </div>

                        <div className="flex flex-col w-full space-y-3">
                            <input
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                placeholder="Enter pickup location."
                                className="outline-none border-none bg-gray-200 p-2 w-full"
                            />

                            <input
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where to?"
                                className="outline-none border-none bg-gray-200 p-2 w-full"
                            />
                        </div>

                        <div className="bg-gray-200 flex p-1 rounded-full cursor-pointer">
                            <Image
                                src="https://img.icons8.com/ios/50/000000/plus-math.png"
                                alt=""
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 flex items-center space-x-3">
                <div className="bg-gray-400 p-2 rounded-full flex">
                    <Image
                        src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"
                        alt=""
                        width={20}
                        height={20}
                    />
                </div>
                <h1>Saved places</h1>
            </div>

            <Link
                href={{
                    pathname: '/confirm',
                    query: {
                        pickup: pickup,
                        destination: destination,
                    },
                }}
                passHref
            >
                <div className="px-4 py-2">
                    <button className="bg-black text-white font-semibold text-lg w-full py-2 active:scale-90 transition">
                        Confirm Locations
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default Search
