import {
    AGREGAR_CARRITO,
    ELIMINAR_CARRITO,
    CAMBIAR_CANTIDAD,
    OBTENER_CARRITO
} from './types/index'


export default (state, action) => {

    switch (action.type) {

        case AGREGAR_CARRITO:
            return {
                ...state,
                productosCarrito: [...state.productosCarrito, action.payload],
                carritoCantidad: state.carritoCantidad + 1
            }

        case ELIMINAR_CARRITO:
            return {
                ...state,
                carritoCantidad: state.carritoCantidad - state.productosCarrito[state.productosCarrito.findIndex(el => el.id === action.payload)].cantidad,
                productosCarrito: state.productosCarrito.filter(el => el.id !== action.payload),
            }

        case CAMBIAR_CANTIDAD:
            return {
                ...state,
                productosCarrito: state.productosCarrito.map(el => el.id === action.payload.id ? action.payload : el),
                carritoCantidad: state.carritoCantidad + 1
            }

        case OBTENER_CARRITO:
            return {
                ...state,
                productosCarrito: action.payload,
                carritoCantidad: action.payload.reduce((acc, cur) => (acc += cur.cantidad), 0)
            }

        default:
            return state;
    }
}