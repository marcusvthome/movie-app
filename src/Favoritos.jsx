import { useNavigate } from "react-router-dom";
import BotaoVoltar from "./BotaoVoltar.jsx";

function Favoritos() {
    const navigate = useNavigate()
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="flex items-center px-8 py-8">
                <BotaoVoltar />
                <h1 className="text-3xl font-bold flex-1 text-center">Meus Favoritos ❤️</h1>
            </div>

            {favoritos.length === 0 ? (
                <p className="text-center text-gray-400 mt-20">Nenhum filme favoritado ainda.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-8">
                    {favoritos.map((filme) => (
                        <div
                            key={filme.id}
                            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate(`/filme/${filme.id}`)}
                        >
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
            )}
        </div>
    )
}

export default Favoritos
