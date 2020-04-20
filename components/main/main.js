import React, { useContext, useEffect, useState } from 'react'
import Productos from './productos'
import useProductos from '../../hooks/useProductos'
import { motion } from 'framer-motion'
import Spinner from '../spinner'

const Main = () => {

    const [cargando, guardarCargando] = useState(true)

    const { productosArray } = useProductos();

    useEffect(() => {

        if (productosArray.length >= 1) {
            guardarCargando(false)
        }

    }, [productosArray])
    return (
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }}
            initial={{ opacity: 0 }} className="container">

            <div className="main-container">

                <div className="main-text-introduction">
                    <div className="main-text-container">
                        <div className="lineas"></div>
                        <h3>Estrellas</h3>
                    </div>
                </div>

                <div className="main-productos-container">
                    {cargando ? <Spinner /> :
                        productosArray.map(producto => (
                            <Productos
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    }

                </div>

            </div>
        </motion.div >
    );
}

export default Main;