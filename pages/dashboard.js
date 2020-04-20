import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import DashboardContent from '../components/dashboard/dashboardContent'

import firebase from '../firebase/firebase'

const Dashboard = () => {

    // router
    const router = useRouter();

    const [user, guardarUser] = useState(null)

    firebase.auth.onAuthStateChanged(usuario => {
        if (usuario) {
            guardarUser(true)
        }
    })

    useEffect(() => {
        firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUser(true)
            } else {
                router.push('/login')
            }
        })
    }, [])

    return (
        <Layout admin={true} pagina='Dashboard'>
            {!user ? '' :
                <DashboardContent />
            }

        </Layout>
    );
}

export default Dashboard;