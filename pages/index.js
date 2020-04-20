import React from 'react';
import Layout from '../components/Layout'
import Banner from '../components/hero/banner'
import Main from '../components/main/main'

const Home = () => {

  return (
    <Layout pagina='Inicio'>
      <Banner />
      <Main />
    </Layout>
  )

}

export default Home
