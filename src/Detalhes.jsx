import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BotaoVoltar from './BotaoVoltar.jsx'

function Detalhes() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState(null)

    useEffect(() => {
        async function buscarDetalhes() {
            try {
                const resposta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR`)
                const dados = await resposta.json()
                setFilme(dados)
            } catch (erro) {
                console.log("Erro ao buscar detalhes", erro)
            }
        }
        buscarDetalhes()
    }, [id])

    if (!filme) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pb-16">
            <div className="mb-4">
                <BotaoVoltar />
            </div>
            <div className="flex gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                    alt={filme.title}
                    className="w-64 rounded-lg"
                />
                <div>
                    <h1 className="text-4x1 font-bold mb-4">{filme.title}</h1>
                    {filme.genres.map((genre) => (
                        <span key={genre.id} className='inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20 mr-1 mb-4'>
                            {genre.name}
                        </span>
                    ))}
                    <p className="text-yellow-400 text-lg mb-4">⭐ {filme.vote_average.toFixed(1)}</p>
                    <p className="text-gray-400 mb-4">{new Date(filme.release_date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    <p className="text-gray-200 leading-relaxed">{filme.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default Detalhes