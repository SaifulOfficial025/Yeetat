import { Outlet } from 'react-router-dom'
import { Footer } from '../Pages/Shared/Footer'
import Navbar from '../Pages/Shared/Navbar'

export const Main = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
