import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'
import Navbar from './Component/Navbar'
import Hiro from './Component/Hiro'
import Popular from './Component/Popular'
import Works from './Component/Works'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hiro/>
      <Popular/>
      <Works/>
    </>
  )
}

export default App
