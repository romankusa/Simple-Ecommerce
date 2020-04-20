import React, { useState, useContext } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

//import { FirebaseContext } from '../firebase/index'
import Swal from 'sweetalert2'

import firebase from '../firebase/index'

const Login = () => {

    //const { firebase } = useContext(FirebaseContext)

    const router = useRouter();

    const [usuario, guardarUsuario] = useState({
        email: '',
        contraseña: ''
    })

    const { email, contraseña } = usuario

    const guardarItem = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    // cuando manda el form
    const handleSubmit = async e => {
        e.preventDefault();

        // si no hay datos en el state no correr la funcion
        if (email.trim('') === '' || contraseña.trim('') === '') {
            return;
        }

        // login en la base de datos
        try {
            await firebase.auth.signInWithEmailAndPassword(email, contraseña)

            router.push('/dashboard')

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Incorrecto',
                text: 'Tu mail o contraseña no coinciden',
            })
        }

    }

    return (
        <Layout pagina='Login'>


            <div className="container">
                <div className="login-container">

                    <div className="login-inputs-container">
                        <div className="admin-text">
                            <h4>Login</h4>
                            <p>Debes ser admin para acceder a esta ruta.</p>
                            <Link href="/"><a className="no-eres-admin">¿No eres admin?</a></Link>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="placeholder-container">
                                <input
                                    type="text"
                                    className="input"
                                    name="email"
                                    value={email}
                                    onChange={guardarItem}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-placeholder">Email</label>
                            </div>

                            <div className="placeholder-container">
                                <input
                                    type="password"
                                    className="input"
                                    name="contraseña"
                                    value={contraseña}
                                    onChange={guardarItem}
                                    placeholder=" "
                                    required
                                />
                                <label className="input-placeholder">Contaseña</label>
                            </div>
                            <button>Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;