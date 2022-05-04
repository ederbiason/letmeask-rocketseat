import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

// Muito comum no mundo front-end importar imagens, por causa do webpack 
// Ele é um Module Bundler - pega a extenção do arquivo com algumas predefinições para ser entendido no JS
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss'
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const navigate = useNavigate()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        // previnir que a pagina de reaload quando o onSubmit for acionado
        event.preventDefault();

        // trim -> remove os espaços da direta e esquerda 
        if (newRoom.trim() === '') {
            return;
        }

        // Referencia para um registro de dado dentro de um banco de dados
        const roomRef = database.ref('rooms');

        // jogando uma informação (uma nova sala) para dentro de rooms
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        navigate(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    {/* se eu colocar o handle dentro do botão, se a pessoa usar enter para finalizar o processo, nao vai funcionar */}
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique Aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}