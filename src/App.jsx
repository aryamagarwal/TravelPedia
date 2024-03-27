import Navbar from "./components/navbar"
import Footer from "./components/footer"
import { Outlet } from "react-router-dom"
function App() {

  return (
    <>
    <Navbar/>
    <Outlet />
    <Footer/>
    </>
  )
}

export default App
