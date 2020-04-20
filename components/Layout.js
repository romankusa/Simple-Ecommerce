import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from './hero/header'

const Layout = ({ children, admin, pagina }) => {

    useEffect(() => {
        let vh = window.innerHeight * .01;
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [])

    return (
        <>
            <Head>
                <title>Simple Ecommerce | {pagina}</title>
                <link href="/static/css/app.css" rel="stylesheet" />
                <meta name="description" content="Ecommerce simple." />
            </Head>


            <Header admin={admin} />

            {children}
        </>
    );
}

export default Layout;