import React from 'react'
import { motion } from 'framer-motion'


let easing = [0.6, -0.05, 0.01, 0.99];


const Banner = () => {
    return (
        <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1, x: 0, transition: { ease: easing, duration: 1 } }}
            initial={{ opacity: 0, x: 100 }} className="container">
            <div className="banner-container">
                <div className="hero-container">
                    <h2>Ecommerce <span className="hero-color-text">Simple.</span></h2>
                </div>
            </div>
        </motion.div>
    );
}

export default Banner;