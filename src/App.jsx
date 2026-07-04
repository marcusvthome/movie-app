import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Detalhes from './Detalhes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Detalhes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App