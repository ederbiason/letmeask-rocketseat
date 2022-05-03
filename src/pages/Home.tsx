// useContext - recuperar o valor de um contexto
import { useNavigate } from 'react-router-dom'

// Muito comum no mundo front-end importar imagens, por causa do webpack 
// Ele é um Module Bundler - pega a extenção do arquivo com algumas predefinições para ser entendido no JS
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';


import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';

export function Home() {
    // toda função que começa com "use", chamamos de hook no react
    // precisa estar dentro do componente
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/rooms/new')
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="ilustration svg"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask logo"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google Logo" />
                        Cria sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}