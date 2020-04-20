import React, { useContext } from 'react'
import carritoContext from '../../context/carritoContext'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'


const Productos = ({ producto }) => {

    // obtener producto
    const { precio, nombre, id, urlimagen } = producto

    // obtener context 
    const context = useContext(carritoContext)
    const { agregarAlCarrito } = context

    const manejarCarrito = () => {
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Se agrego correctamente',
            showConfirmButton: false,
            timer: 1000
        })
        agregarAlCarrito(producto)
    }

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            key={id} className="productos-layout-container">
            <div className="fondo"></div>
            <Link href="/productos/[id]" as={`/productos/${id}`}>
                <img src={urlimagen} className="imagen"></img>
            </Link>
            <div className="informacion-productos">
                <Link href="/productos/[id]" as={`/productos/${id}`}>
                    <p>{nombre}</p>
                </Link>
                <p className="precio">{precio}$</p>
            </div>
            <div className="agregar-al-carrito">
                <p
                    onClick={manejarCarrito}
                >Agregar al carrito</p>
            </div>
        </motion.div>
    );
}

export default Productos;