import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SkeletonCard from './SkeletonCard.jsx'

function Home() {
    const [filmes, setFilmes] = useState([])
    const [busca, setBusca] = useState('')
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(true)
    const [favoritos, setFavoritos] = useState(() => {
        const salvo = localStorage.getItem("favoritos")
        return salvo ? JSON.parse(salvo) : []
    })

    async function buscarFilmes() {
        try {
            const resposta = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`
            )
            const dados = await resposta.json()
            setFilmes(dados.results)
        } catch (erro) {
            console.log("Erro ao buscar filmes", erro)
        } finally {
            setCarregando(false)
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

    function toggleFavorito(filme) {
        const jaFavorito = favoritos.some(f => f.id === filme.id)

        let novosFavoritos
        if (jaFavorito) {
            novosFavoritos = favoritos.filter(f => f.id !== filme.id)
        } else {
            novosFavoritos = [...favoritos, filme]
        }

        setFavoritos(novosFavoritos)
        localStorage.setItem("favoritos", JSON.stringify(novosFavoritos))
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex items-center gap-4 py-8 px-8">
                <h1 className="text-3xl flex-1 text-center font-bold">🎬 Movie App</h1>
                <button
                    onClick={() => navigate('/favoritos')}
                    className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 text-sm text-gray-400 hover:text-gray-300 inset-ring inset-ring-gray-400/20"
                >
                    ❤️ Favoritos
                </button>
            </div>

            <div className="grid px-8 mb-8">
                <input className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-500 sm:text-sm/6" type="text" name="buscar" id="buscar" placeholder='Pesquise algo...' value={busca} onChange={(e) => {
                    setBusca(e.target.value)
                    buscarFilmesPorNome(e.target.value)
                }}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-8">
                {carregando
                    ? Array(12).fill(0).map((_, index) => <SkeletonCard key={index} />)
                    : filmes.map((filme) => (
                        <div
                            key={filme.id}
                            className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate(`/filme/${filme.id}`)}
                        >
                            <button
                                className="absolute top-2 right-2 text-xl z-10"
                                onClick={(e) => {
                                    e.stopPropagation() //impede que o clique no coração abra a página de detalhes
                                    toggleFavorito(filme)
                                }}
                            >
                                {favoritos.some(f => f.id === filme.id) ? '❤️' : '🤍'}
                            </button>

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
                    ))
                }
            </div>
        </div>
    )
}

export default Home