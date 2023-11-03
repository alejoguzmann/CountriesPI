import Landing from './views/landing/landing'
import Home from './views/home/home'
import Detail from './views/detail/detail'
import Create from './views/create/create'

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:ID' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  )
}

export default App
