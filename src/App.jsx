import { useState, useEffect } from 'react'

function App() {
  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')

  async function buscarFilmes() {
    try {
      const resposta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
      )
      const dados = await resposta.json()
      setFilmes(dados.results)
    } catch (erro) {
      console.log("Erro ao buscar filmes", erro)
    }
  }

  // useEffect() executa quando o componente carrega
  useEffect(() => {
    buscarFilmes()
  }, []) // O array vazio [] garante que só busca uma vez

  async function buscarFilmesPorNome(nome) {
    try {
      if (nome == '') {
        buscarFilmes()
      } else {
        const resposta = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR&query=${nome}`
        )
        const dados = await resposta.json()
        setFilmes(dados.results)
      }
    } catch (erro) {
      console.log("Erro ao buscar filmes por nome", erro)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center py-8">Movie App</h1>

      <div className="grid px-8 mb-8">
        <input className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" type="text" name="buscar" id="buscar" placeholder='Buscar' value={busca} onChange={(e) => {
          setBusca(e.target.value)
          buscarFilmesPorNome(e.target.value)
        }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-8">
        {filmes.map((filme) => (
          <div key={filme.id} className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
            <img
              src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
              alt={filme.title}
              className="w-full"
            />
            <div className="p-3">
              <h2 className="font-bold text-sm">{filme.title}</h2>
              <p className="text-yellow-400 text-sm mt-1">⭐ {filme.vote_average.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App