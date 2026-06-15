import { Outlet } from 'react-router-dom'
import Footer from '../Component/footer/Footer'
import Navbar from '../Component/navbar/Navbar'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}