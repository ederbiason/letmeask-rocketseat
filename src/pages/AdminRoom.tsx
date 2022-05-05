import '../styles/room.scss';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParms = {
    id: string;
}


export function AdminRoom() {
    const {user} = useAuth();
    // parametro para a tipagem
    const params = useParams<RoomParms>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { title, questions } = useRoom(roomId!)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo imagem"/>
                    <div>
                        <RoomCode code={roomId!}/>
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                </div>
                
                <div className="question-list">
                    {/* percorre o question e retornar um componente novo para cada um deles */}
                    {questions.map(question => {
                        return (
                            <Question
                            // precisamos para a key para o react conseguir identificar uma pergunta da outra
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}