import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth, provider } from '../Firebase'
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'

const Login = () => {
    const router = useRouter()

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/')
            }
        })
    }, [])

    return (
        <div className="bg-gray-200 h-screen flex flex-col items-center">
            <Head>
                <title>Login</title>
            </Head>
            <div className="h-[50%] relative">
                <div className="absolute flex flex-col p-4">
                    <h1 className="font-semibold text-3xl">UBER</h1>
                    <h1 className="text-5xl pt-4 text-gray-500">
                        Login to access your account
                    </h1>
                </div>

                <img
                    src="https://i.ibb.co/CsV9RYZ/login-image.png"
                    alt=""
                    className="object-contain h-full pt-[5rem]"
                />
            </div>

            <div className="w-full px-2">
                <button
                    className="bg-black text-white w-full py-2 rounded-lg active:scale-95 transition font-semibold text-xl"
                    onClick={handleGoogleLogin}
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}

export default Login
