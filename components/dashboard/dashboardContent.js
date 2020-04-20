import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import useProductos from '../../hooks/useProductos'
import AgregarProducto from './agregarProducto';

import { FirebaseContext } from '../../firebase/index'


const DashboardContent = () => {

    // context de firebase para subir producto
    const { firebase } = useContext(FirebaseContext)

    // abrir form de agregar producto
    const [abrir, guardarAbrir] = useState(false)

    // obtener productos de firebase
    const { productosArray } = useProductos();

    const eliminarProducto = (producto) => {

        // mostrar alerta si esta seguro
        Swal.fire({
            title: 'Seguro?',
            text: "Se eliminara el producto de la base de datos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                Swal.fire(
                    'Eliminado!',
                    'Tu producto ha sido eliminado',
                    'success'
                )
                firebase.db.collection('productos').doc(producto.id).delete();
                firebase.storage.ref('productos').child(producto.nombreimagen).delete();
            }
        })


        // eliminarlo de la base de datos
    }

    return (
        <div className="dashboard-container">

            <div className="admin-container">
                <div className="admin-datos">
                    <img src="/static/img/account.svg" alt="" />
                    <p>Hola, <span className="admin-nombre">Admin</span></p>
                </div>

            </div>

            <div className="productos-container">

                <h1>Mis Productos</h1>

                <ul className="productos-lista">
                    {productosArray.map(producto => (
                        <li key={producto.id} className="carrito-item">
                            <div className="carrito-nombre-imagen">
                                <img src={producto.urlimagen} alt={producto.nombre} />
                                <p>{producto.nombre}</p>
                            </div>
                            <div className="carrito-resto">
                                <p>${producto.precio}</p>
                                <img
                                    onClick={() => eliminarProducto(producto)}
                                    src="/static/img/cancel.svg" className="close-icon"></img>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="administrar-productos">

                <div
                    onClick={() => guardarAbrir(!abrir)}
                    className="agregar-producto">
                    <h1>Agregar producto +</h1>
                </div>

                {abrir ? <AgregarProducto guardarAbrir={guardarAbrir} /> : ''}

                <div className="productos-datos">
                    <ul>
                        <li className="datos-container">
                            <div className="img-container">
                                <img src="/static/img/target.svg" alt="" />
                            </div>
                            <div className="datos-nombre">
                                <p>$300.40</p>
                                <p className="dato-nombre">Ventas</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default DashboardContent;