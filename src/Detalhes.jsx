import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
            <button
                onClick={() => navigate('/')}
                className="mb-6 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
            >
                ← Voltar
            </button>
            <div className="flex gap-8">
                <img
                    src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                    alt={filme.title}
                    className="w-64 rounded-lg"
                />
                <div>
                    <h1 className="text-4x1 font-bold mb-4">{filme.title}</h1>
                    <p className="text-yellow-400 text-lg mb-4">⭐ {filme.vote_average.toFixed(1)}</p>
                    <p className="text-gray-400 mb-4">{new Date(filme.release_date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    <p className="text-gray-200 leading-relaxed">{filme.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default Detalhes