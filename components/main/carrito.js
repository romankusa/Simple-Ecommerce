import React, { useContext, useState, useEffect } from 'react'
import carritoContext from '../../context/carritoContext'
import Link from 'next/link'

const Carrito = () => {
    const [total, guardarTotal] = useState(0)

    // agarrar context
    const context = useContext(carritoContext)
    const { productosCarrito, eliminarCarrito } = context;

    const eliminarProducto = id => {
        eliminarCarrito(id)
    }

    useEffect(() => {
        if (productosCarrito.length >= 1) {
            const nuevoTotal = productosCarrito.reduce((acc, cur) => (acc += cur.precio * cur.cantidad), 0)
            guardarTotal(nuevoTotal)
        } else {
            guardarTotal(0)
        }
    }, [productosCarrito])


    return (
        <div className="carrito-dropdown-container">
            <ul className="carrito">
                {productosCarrito.length <= 0 || total === 0 ? '' :
                    productosCarrito.map(producto => (
                        <li key={producto.id} className="carrito-item">
                            <div className="carrito-nombre-imagen">
                                <img src={producto.urlimagen} alt={producto.nombre} />
                                <p>{producto.nombre}</p>
                            </div>
                            <div className="carrito-resto">
                                <p>x{producto.cantidad}</p>
                                <p>${producto.precio}</p>
                                <img
                                    onClick={() => eliminarProducto(producto.id)}
                                    src="/static/img/cancel.svg"
                                    className="close-icon"></img>
                            </div>
                            <div className="line"></div>
                        </li>
                    ))
                }
            </ul>

            <div className="carrito-subtotal">
                <p>SUB-TOTAL</p>
                <p className="subtotal-numero">${total}</p>
            </div>

            <div className="carrito-botones">
                <Link href="/checkout"><a className="checkout">Checkout</a></Link>
            </div>

        </div>
    );
}

export default Carrito;