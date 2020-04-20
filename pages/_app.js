import App from 'next/app'

import { AnimatePresence } from 'framer-motion'

// firebase
import firebase, { FirebaseContext } from '../firebase/index'
import CarritoState from '../context/carritoState'


// importar auth hook
import useAutenticacion from '../hooks/useAutenticacion'

const MyApp = props => {
    const { Component, pageProps } = props
    const { usuario } = useAutenticacion()

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <CarritoState>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} />
                </AnimatePresence>
            </CarritoState>
        </FirebaseContext.Provider>
    )
}

export default MyApp