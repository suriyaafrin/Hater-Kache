import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import Navbar from './Component/Navbar'
import Hiro from './Component/Hiro'
import Popular from './Component/Popular'
import Works from './Component/Works'
import Footer from './Component/Footer'
import FooterLower from './Component/FooterLower'
import FooterMiddle from './Component/FooterMiddle'
import PlumbingHiro from './Plumbing/PlumbingHiro'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hiro/>
      <Popular/>
      <Works/>
      <Footer/>
      <FooterMiddle/>
      <FooterLower/>
      <PlumbingHiro/>
    </>
  )
}

export default App
