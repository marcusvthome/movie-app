import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Detalhes from './Detalhes'
import Favoritos from './Favoritos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Detalhes />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App