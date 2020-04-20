import React, { useReducer, useState, useEffect } from 'react'
import CarritoReducer from './carritoReducer'
import carritoContext from './carritoContext'

import {
    AGREGAR_CARRITO,
    ELIMINAR_CARRITO,
    CAMBIAR_CANTIDAD,
    OBTENER_CARRITO
} from './types/index'


const CarritoState = (props) => {

    const initialState = {
        productosCarrito: [],
        carritoCantidad: 0
    }

    const [state, dispatch] = useReducer(CarritoReducer, initialState)

    // obtener productos de local storage
    useEffect(() => {
        const data = localStorage.getItem('carritostate');
        if (data) {
            dispatch({
                type: OBTENER_CARRITO,
                payload: JSON.parse(data)
            })
        }
    }, [])

    // guardar productos en local storage
    useEffect(() => {
        localStorage.setItem('carritostate', JSON.stringify(state.productosCarrito))
    }, [state.productosCarrito])



    // agregar producto al carrito
    const agregarAlCarrito = (producto) => {

        const index = state.productosCarrito.findIndex(el => el.id === producto.id);

        if (index !== -1) {

            producto.cantidad += 1;

            dispatch({
                type: CAMBIAR_CANTIDAD,
                payload: producto
            })

        } else {

            dispatch({
                type: AGREGAR_CARRITO,
                payload: producto
            })
        }

    }


    // eliminar producto del carrito
    const eliminarCarrito = id => {
        dispatch({
            type: ELIMINAR_CARRITO,
            payload: id
        })
    }




    return (
        <carritoContext.Provider
            value={{
                productosCarrito: state.productosCarrito,
                carritoCantidad: state.carritoCantidad,
                agregarAlCarrito,
                eliminarCarrito
            }}
        >
            {props.children}
        </carritoContext.Provider>
    )
}

export default CarritoState;