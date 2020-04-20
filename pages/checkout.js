import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout';

import carritoContext from '../context/carritoContext'


const Checkout = () => {

    const [total, guardarTotal] = useState(0)

    // agarrar context
    const context = useContext(carritoContext)
    const { productosCarrito, eliminarCarrito } = context;

    useEffect(() => {

        if (productosCarrito.length >= 1) {
            const nuevoTotal = productosCarrito.reduce((acc, cur) => (acc += cur.precio * cur.cantidad), 0)

            guardarTotal(nuevoTotal)
        } else {
            guardarTotal(0)
        }

    }, [productosCarrito])

    const eliminarProducto = id => {
        eliminarCarrito(id)
    }

    return (
        <Layout pagina='Checkout'>
            <div className="container">
                <div className="checkout-container">

                    <h1>Carrito</h1>
                    <ul>
                        {total === 0 ? <p>Todavia no tienes productos en el carrito</p> :
                            productosCarrito.map(producto => (
                                <li key={producto.id} className="producto">
                                    <div className="producto-primeras2">
                                        <img src={producto.urlimagen} alt={producto.nombre} />
                                        <h2>{producto.nombre}</h2>
                                    </div>
                                    <div className="producto-ultimas">
                                        <p>x{producto.cantidad}</p>
                                        <p>${producto.precio * producto.cantidad}</p>
                                        <img
                                            onClick={() => eliminarProducto(producto.id)}
                                            src="/static/img/cancel.svg" alt="" />
                                    </div>

                                </li>
                            ))
                        }
                    </ul>

                    <div className="pagar-container">
                        <h3>Total</h3>
                        <p>${total}</p>
                        <button>Ir a pagar</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Checkout;