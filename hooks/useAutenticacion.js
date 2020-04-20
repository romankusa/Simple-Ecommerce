import React, { useState, useEffect } from 'react'

import firebase from '../firebase/firebase'

const useAutenticacion = () => {

    const [usuario, guardarUsuario] = useState()

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsuario(usuario)
            } else {
                guardarUsuario(null)
            }
        })
        return () => unsuscribe();
    }, [])

    return {
        usuario
    };
}

export default useAutenticacion;