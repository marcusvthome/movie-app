import { useNavigate } from 'react-router-dom'

function BotaoVoltar() {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-xs text-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 inset-ring inset-ring-gray-400/20"
        >
            ← Voltar
        </button>
    )
}

export default BotaoVoltar