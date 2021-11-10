// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyC5P65uX97VpAvwtTkPlA2a3s6QaPS3t2w',
    authDomain: 'uber-clone-next-c8778.firebaseapp.com',
    projectId: 'uber-clone-next-c8778',
    storageBucket: 'uber-clone-next-c8778.appspot.com',
    messagingSenderId: '160722892406',
    appId: '1:160722892406:web:25f0d0ef7841b685019157',
}

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth }
