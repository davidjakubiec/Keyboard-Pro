import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from "framer-motion";



const Reveal = ({ children }) => {
  return (
    <div >
        <motion.div
            variants={{
                hidden: {opacity: 0, y: 75},
                visible: {opacity: 1, y: 0}
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
            }}
        >
            {children}
        </motion.div>
    </div>
  )
}

export default Reveal