import React, { useState, useContext } from 'react'
import FileUploader from 'react-firebase-file-uploader'
import Swal from 'sweetalert2'


// firebase
import { FirebaseContext } from '../../firebase/index'

const AgregarProducto = ({ guardarAbrir }) => {

    // context de firebase
    const { firebase } = useContext(FirebaseContext)

    // states del producto
    const [urlimagen, guardarUrlImagen] = useState('')
    const [nombreimagen, guardarNombreImagen] = useState('')
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: null,
        descripcion: ''
    })

    const { nombre, precio, descripcion } = producto;

    const guardarItem = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }

    // guardar imagen en base de datos y guardar
    // la url en el producto
    const handleUploadSuccess = async nombre => {
        guardarNombreImagen(nombre)
        await firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
                guardarUrlImagen(url);
            });
    };

    // guardar producto en base de datos
    const handleSubmit = e => {

        e.preventDefault();

        if (nombre.trim('') === '' ||
            precio.trim('') === '' ||
            descripcion.trim('') === '') {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
            })
            return;
        }

        if (urlimagen.trim('') === '') {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Subiendo imagen, espera unos segundos',
            })

            return
        }

        // crear objeto del producto
        const nuevoProducto = {
            nombre,
            precio,
            descripcion,
            urlimagen,
            vendidos: 0,
            cantidad: 1,
            nombreimagen
        }


        // enviar el producto a la base de datos
        firebase.db.collection('productos').add(nuevoProducto)


        // mostrar mensaje si sale todo bien
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Producto subido correctamente',
            showConfirmButton: false,
            timer: 1000
        })

        // cerrar form
        guardarAbrir(false)

    }


    return (

        <div className="agregar-producto-formulario">


            <form
                onSubmit={handleSubmit}
                noValidate

            >

                {/* Nombre producto */}
                <div className="placeholder-container">
                    <input
                        type="text"
                        className="input"
                        name="nombre"
                        value={nombre}
                        onChange={guardarItem}
                        placeholder=" "
                    />
                    <label className="input-placeholder">Nombre</label>
                </div>

                {/* Precio producto */}
                <div className="placeholder-container">
                    <input
                        type="number"
                        className="input"
                        name="precio"
                        value={precio}
                        onChange={guardarItem}
                        placeholder=" "
                    />
                    <label className="input-placeholder">Precio</label>
                </div>

                {/* descripcion */}
                <div className="placeholder-container">
                    <textarea
                        type="text"
                        className="input"
                        name="descripcion"
                        value={descripcion}
                        onChange={guardarItem}
                        placeholder=" "
                    ></textarea>
                    <label className="input-placeholder">Descripcion</label>
                </div>

                {/* imagen */}
                <div className="imagen-uploader-container">


                    <FileUploader
                        className="img-uploader"
                        accept="image/*"
                        id="imagen"
                        name="imagen"
                        randomizeFilename
                        storageRef={firebase.storage.ref("productos")}
                        onUploadSuccess={handleUploadSuccess}
                    />

                </div>

                <button className="agregar-btn">Agregar</button>

            </form>
        </div>
    );

}

export default AgregarProducto;