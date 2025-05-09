// import React, { useContext, useEffect } from 'react'
// import style from './Layout.module.css'
// import Navbarrr from '../Navbar/Navbar'
// import { Outlet } from 'react-router-dom'
// import Footer from '../Footer/Footer'



// export default function Layout() {


//   return (
//     <>
//       <Navbarrr/>
//       <Outlet/>
//       <Footer/>
//     </>
//   )
// }


import React from 'react';
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}