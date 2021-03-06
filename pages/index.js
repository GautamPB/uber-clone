import { useState, useEffect } from 'react'
import { auth } from '../Firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Map from '../components/Map'
import Image from 'next/image'
import ActionButton from '../components/ActionButton'
import Link from 'next/link'

export default function Home() {
    const router = useRouter()

    const [user, setUser] = useState(null)

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            // listener to check if a user is logged in or not
            if (user) {
                setUser({
                    name: user.displayName,
                    photo: user.photoURL,
                })
            } else {
                setUser(null)
                router.push('/login')
            }
        })
    }, [router, user])

    return (
        <div className="h-screen flex flex-col lg:flex-row">
            <Head>
                <title>Uber Clone</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Map />

            <div className="flex-1 p-5 space-y-5">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-5xl">UBER</h1>

                    <Link href="/login" passHref>
                        <div
                            className="flex items-center space-x-4 cursor-pointer"
                            onClick={() => signOut(auth)}
                        >
                            <h1 className="text-sm">{user && user.name}</h1>
                            <div>
                                <Image
                                    src={
                                        user
                                            ? user.photo
                                            : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.chocolatebayou.org%2Fvolunteers%2Fdefault-profile-picture%2F&psig=AOvVaw1Rtv-HE5KfKpAUDq2Byjht&ust=1636612091245000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDx4KWVjfQCFQAAAAAdAAAAABAO'
                                    }
                                    alt=""
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex space-x-4">
                    <ActionButton
                        imageSrc="https://i.ibb.co/cyvcpfF/uberx.png"
                        title="Ride"
                        link="/search"
                    />

                    <ActionButton
                        imageSrc="https://i.ibb.co/n776JLm/bike.png"
                        title="2 Wheels"
                        link="/search"
                    />

                    <ActionButton
                        imageSrc="https://i.ibb.co/5RjchBg/uberschedule.png"
                        title="Reserver"
                        link="/search"
                    />
                </div>

                {/* INPUT BUTTONS */}
                <div className="h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8">
                    <h1>Where to?</h1>
                </div>
            </div>
        </div>
    )
}
