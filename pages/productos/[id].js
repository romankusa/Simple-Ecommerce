import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import Swal from 'sweetalert2'
import Spinner from '../../components/spinner'

import { FirebaseContext } from '../../firebase/index'

import carritoContext from '../../context/carritoContext'

import { motion } from 'framer-motion'

let easing = [0.6, -0.05, 0.01, 0.99];


const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: 1,
            ease: easing
        }
    }
};

const Producto = () => {


    const [cargandoimagen, guardarCargandoImagen] = useState(false)
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)


    // context firebase
    const { firebase } = useContext(FirebaseContext)

    // context carrito
    const context = useContext(carritoContext)
    const { agregarAlCarrito } = context

    // obtener id
    const router = useRouter();
    const { query: { id } } = router

    useEffect(() => {

        if (id) {
            const obtenerProducto = async () => {
                const respuesta = await firebase.db.collection('productos').doc(id).get();
                if (respuesta.exists) {
                    guardarProducto(respuesta.data())
                } else {
                    guardarError(true)
                }
            }
            obtenerProducto();
        }

    }, [id])

    // agregar al carrito
    const manejarClick = () => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Se agrego correctamente',
            showConfirmButton: false,
            timer: 1000
        })
        agregarAlCarrito(producto)
    }

    // informacion del producto
    const { descripcion, urlimagen, precio, nombre } = producto

    return (

        <Layout>
            {error ? <p>No encontramos el producto que estaba buscando</p> :

                <motion.div exit={{ opacity: 0 }} initial='initial' animate='animate' className="container">
                    <div className="productoindividual-container">
                        <motion.div
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            className="productoindividual-background"></motion.div>

                        <motion.div variants={fadeInUp} className="productoindivudual-description">
                            <h1 className="titulo">{nombre}</h1>
                            <p className="descripcion">{descripcion}</p>
                            <p className="precio">${precio}</p>
                            <div className="buton-background">
                                <button
                                    onClick={manejarClick}
                                >Agregar al carrito</button>
                            </div>
                        </motion.div>

                        <div className="productoindividual-imagen">
                            <Spinner style={!cargandoimagen ? {} : { display: 'none' }} />
                            <motion.img
                                style={cargandoimagen ? {} : { display: 'none' }}
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                src={urlimagen} alt={nombre}
                                onLoad={() => guardarCargandoImagen(true)}
                            />


                        </div>
                    </div>
                </motion.div>
            }
        </Layout >
    );
}

export default Producto;