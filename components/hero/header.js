import React, { useState, useContext, useEffect } from 'react';
import Carrito from '../main/carrito'
import carritoContext from '../../context/carritoContext'
import Link from 'next/link'

import { FirebaseContext } from '../../firebase/index'

const Header = ({ admin }) => {

    // agarrar context de carrito
    const CarritoContext = useContext(carritoContext)
    const { carritoCantidad } = CarritoContext;

    // context de firebase
    const { usuario } = useContext(FirebaseContext)

    return (
        <div className="container">
            <div className="header-container">
                <div className="logo">
                    <Link href="/">
                        <h1>SimpleEcommerce</h1>
                    </Link>
                </div>
                <div className="menu-container">
                    <ul className="links">
                        {usuario ? <Link href="/dashboard"><a>Modificar Productos</a></Link> : null}
                    </ul>
                </div>
                {admin ? '' :
                    <div className="carrito-container">
                        <img className="imagen-carrito" src="/static/img/shop.svg" alt="" />
                        <div className="carrito-counter">{carritoCantidad}</div>
                        <Carrito />
                    </div>
                }
            </div>
        </div>
    );
}

export default Header;